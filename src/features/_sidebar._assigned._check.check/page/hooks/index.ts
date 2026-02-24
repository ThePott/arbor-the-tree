import useSimpleMutation from "@/shared/hooks/useSimpleMutation"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getRouteApi, useLoaderData } from "@tanstack/react-router"
import { useEffect } from "react"
import {
    makeReviewCheckAssignmentQueryOptions,
    makeReviewCheckQueryOptions,
    type ReviewCheckResponseData,
} from "../../loader"
import useReviewCheckStore from "../../store"
import type { QuestionIdToRequestInfo } from "../../types"
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
    const { classroom_id, student_id, syllabus_id, is_assignment } = searchParams
    const { extendedBook: extendedBookLoaderData, assignmentWithBooksArray: assignmentWithBooksArrayLoaderData } =
        useLoaderData({
            from: "/_sidebar/_assigned/_check/check/",
        })

    const { data: extendedBookQueryData } = useQuery({
        ...makeReviewCheckQueryOptions({ classroom_id, student_id, syllabus_id }),
        enabled: Boolean(student_id && !is_assignment),
    })
    const { data: assignmentWithBooksArrayQueryData } = useQuery({
        ...makeReviewCheckAssignmentQueryOptions({ classroom_id, student_id }),
        enabled: Boolean(student_id && is_assignment),
    })
    const extendedBook = extendedBookLoaderData ?? extendedBookQueryData
    const assignmentWithBooksArray = assignmentWithBooksArrayQueryData ?? assignmentWithBooksArrayLoaderData
    return { extendedBook, assignmentWithBooksArray }
}

const useReviewCheckMutate = () => {
    const searchParams = route.useSearch()
    const { classroom_id, student_id, syllabus_id } = searchParams
    const { mutate } = useSimpleMutation({
        method: "post",
        url: "/review/check",
        queryKey: ["reviewCheck", classroom_id, student_id, syllabus_id],
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
    const { classroom_id, student_id, syllabus_id } = route.useSearch()
    const queryClient = useQueryClient()

    useEffect(() => {
        if (Object.entries(changedIdToRequestInfo).length === 0) return
        if (Object.values(changedIdToRequestInfoByMultiSelect).length > 0) return

        const timeout = setTimeout(async () => {
            const queryData = queryClient.getQueryData([
                "reviewCheck",
                classroom_id,
                student_id,
                syllabus_id,
            ]) as ReviewCheckResponseData
            const reallyChanged = filterReallyChanged(queryData)
            setChangedIdToRequestInfo(reallyChanged)
            const body = {
                student_id,
                syllabus_id,
                changedReviewChecks: changedIdToRequestInfo,
            }
            mutate({ body, additionalData: changedIdToRequestInfo })
        }, 500)
        return () => clearTimeout(timeout)
    }, [changedIdToRequestInfo, changedIdToRequestInfoByMultiSelect])
}

// NOTE: recent array (다중 선택)에 있는 것을 changed에 저장해두는 역할
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
    const { assignmentWithBooksArray, extendedBook } = useReviewCheckQuery()
    const { mutate } = useReviewCheckMutate()
    useDetectChangedIdToRequestInfoThenMutate(mutate)
    useConvertRecentToChanged(extendedBook)
    useResetChangedWhenSearchParamsChanged()

    return { extendedBook, assignmentWithBooksArray }
}

export default useReviewCheck
