import { instance } from "@/packages/api/axiosInstances"
import useSimpleMutation from "@/shared/hooks/useSimpleMutation"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getRouteApi } from "@tanstack/react-router"
import { useEffect } from "react"
import useReviewCheckStore from "../../store"
import type { QuestionIdToRequestInfo, ReviewCheckResponseData } from "../../types"
import {
    checkIsMultiSelected,
    findJoinedQuestion,
    makeUpdatedReviewCheckQueryData,
    revertReviewCheckQueryDataAfterMultiSelect,
    updateReviewCheckQueryData,
} from "../../utils"

const route = getRouteApi("/_sidebar")

const useReviewCheckQuery = () => {
    const searchParams = route.useSearch()
    const { classroom_id, student_id, syllabus_id } = searchParams
    const { data } = useQuery({
        queryKey: ["reviewCheck", classroom_id, student_id, syllabus_id],
        queryFn: async () => {
            // NOTE: 다른 학생으로 넘어가면 이걸 지워야 함 mutation.onSuccess 이 아니라 query에서 하는 게 맞기는 한데
            const response = await instance.get("/review/check", { params: searchParams })
            return response.data as ReviewCheckResponseData
        },
    })
    return { data }
}

const useReviewCheckMutate = () => {
    const searchParams = route.useSearch()
    const { classroom_id, student_id } = searchParams
    const { mutate } = useSimpleMutation({
        method: "post",
        url: "/review/check",
        queryKey: ["reviewCheck"],
        params: searchParams,
        update: makeUpdatedReviewCheckQueryData,
        additionalOnSetteled: (client) =>
            client.invalidateQueries({ queryKey: ["progressSession", classroom_id, student_id] }),
    })
    return { mutate }
}
export type ReviewCheckMutate = ReturnType<typeof useReviewCheckMutate>["mutate"]

const filterReallyChanged = (queryData: ReviewCheckResponseData): QuestionIdToRequestInfo => {
    const changedIdToRequestInfo = useReviewCheckStore.getState().changedIdToRequestInfo
    const entryArray = Object.entries(changedIdToRequestInfo)
    const filteredEntryArray = entryArray.filter((entry) => {
        try {
            const joinedQuestion = findJoinedQuestion({ queryData, changedEntry: entry })
            return entry[1].status !== joinedQuestion.review_check_status
        } catch {
            return true
        }
    })
    const isFiltered = entryArray.length !== filteredEntryArray.length
    return isFiltered ? Object.fromEntries(filteredEntryArray) : changedIdToRequestInfo
}

const useDetectChangedIdToRequestInfoThenMutate = (mutate: ReviewCheckMutate) => {
    const changedIdToRequestInfo = useReviewCheckStore((state) => state.changedIdToRequestInfo)
    const setChangedIdToRequestInfo = useReviewCheckStore((state) => state.setChangedIdToRequestInfo)
    const changedIdToRequestInfoByMultiSelect = useReviewCheckStore(
        (state) => state.changedIdToRequestInfoByMultiSelect
    )
    const searchParams = route.useSearch()
    const queryClient = useQueryClient()

    useEffect(() => {
        if (Object.entries(changedIdToRequestInfo).length === 0) return
        if (Object.values(changedIdToRequestInfoByMultiSelect).length > 0) return

        const timeout = setTimeout(async () => {
            const queryData = queryClient.getQueryData(["reviewCheck", searchParams]) as ReviewCheckResponseData
            const reallyChanged = filterReallyChanged(queryData)
            setChangedIdToRequestInfo(reallyChanged)
            const body = {
                student_id: searchParams.student_id,
                syllabus_id: searchParams.syllabus_id,
                changedReviewChecks: changedIdToRequestInfo,
            }
            mutate({ body, additionalData: changedIdToRequestInfo })
        }, 500)
        return () => clearTimeout(timeout)
    }, [changedIdToRequestInfo, changedIdToRequestInfoByMultiSelect])
}

const useConvertRecentToChanged = (data: ReviewCheckResponseData | undefined) => {
    const setChangedReviewChecksByMultiSelect = useReviewCheckStore(
        (state) => state.setChangedIdToRequestInfoByMultiSelect
    )
    const status = useReviewCheckStore((state) => state.status)
    const recentOrderInfoArray = useReviewCheckStore((state) => state.recentOrderInfoArray)
    const searchParams = route.useSearch()

    useEffect(() => {
        if (recentOrderInfoArray.length === 0) return

        const newChangedIdToRequestInfo: QuestionIdToRequestInfo = {}
        if (recentOrderInfoArray.length === 1) {
            const recentReviewCheckInfo = recentOrderInfoArray[0]
            const targetQuestion = findJoinedQuestion({ queryData: data, orderInfo: recentReviewCheckInfo })
            if (targetQuestion.review_check_status === status) return

            newChangedIdToRequestInfo[targetQuestion.id] = {
                status,
                review_check_id: targetQuestion.review_check_id,
                topic_order: recentReviewCheckInfo.topic_order,
                step_order: recentReviewCheckInfo.step_order,
                session_id: targetQuestion.session_id,
            }
            updateReviewCheckQueryData({
                questionIdToRequestInfo: newChangedIdToRequestInfo,
                searchParams,
                storeCallback: () => setChangedReviewChecksByMultiSelect(newChangedIdToRequestInfo),
            })
            return
        }

        data?.topics.forEach((topic) =>
            topic.steps.forEach((step) =>
                step.questions.forEach((question) => {
                    const isMultiSelected = checkIsMultiSelected({
                        topic_order: topic.order,
                        step_order: step.order,
                        question_order: question.order,
                    })
                    if (!isMultiSelected) return

                    newChangedIdToRequestInfo[question.id] = {
                        status,
                        review_check_id: question.review_check_id,
                        topic_order: topic.order,
                        step_order: step.order,
                        session_id: question.session_id,
                    }
                })
            )
        )

        revertReviewCheckQueryDataAfterMultiSelect({
            newChangedIdToRequestInfoByMultiSelect: newChangedIdToRequestInfo,
            searchParams,
        })
        updateReviewCheckQueryData({
            questionIdToRequestInfo: newChangedIdToRequestInfo,
            searchParams,
            storeCallback: () => setChangedReviewChecksByMultiSelect(newChangedIdToRequestInfo),
        })
    }, [recentOrderInfoArray])
}

const useResetChangedWhenSearchParamsChanged = () => {
    const setChangedIdToRequestInfo = useReviewCheckStore((state) => state.setChangedIdToRequestInfo)
    const setChangedIdToRequestInfoByMultiSelect = useReviewCheckStore(
        (state) => state.setChangedIdToRequestInfoByMultiSelect
    )
    const { student_id, syllabus_id, classroom_id } = route.useSearch()
    useEffect(() => {
        setChangedIdToRequestInfo({})
        setChangedIdToRequestInfoByMultiSelect({})
    }, [student_id, syllabus_id, classroom_id])
}

const useReviewCheck = () => {
    const { data } = useReviewCheckQuery()
    const { mutate } = useReviewCheckMutate()
    useDetectChangedIdToRequestInfoThenMutate(mutate)
    useConvertRecentToChanged(data)
    useResetChangedWhenSearchParamsChanged()

    return { data }
}

export default useReviewCheck
