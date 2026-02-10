import { instance } from "@/packages/api/axiosInstances"
import useSimpleMutation from "@/shared/hooks/useSimpleMutation"
import { useQuery } from "@tanstack/react-query"
import { getRouteApi } from "@tanstack/react-router"
import { useEffect } from "react"
import useReviewCheckCreateStore from "../../store"
import type { QuestionIdToRequestInfo, ReviewCheckCreateResponseData } from "../../types"
import {
    checkIsMultiSelected,
    findJoinedQuestion,
    makeUpdatedReviewCheckQueryData,
    revertReviewCheckQueryDataAfterMultiSelect,
    updateReviewCheckQueryData,
} from "../../utils"

const route = getRouteApi("/_sidebar")

const useReviewCheckQuery = () => {
    const setChangedReviewChecks = useReviewCheckCreateStore((state) => state.setChangedReviewChecks)
    const searchParams = route.useSearch()
    const { data } = useQuery({
        queryKey: ["reviewCheck", searchParams],
        queryFn: async () => {
            setChangedReviewChecks({})
            const response = await instance.get("/review/check", { params: searchParams })
            return response.data as ReviewCheckCreateResponseData
        },
    })
    return { data }
}

const useReviewCheckMutate = () => {
    const searchParams = route.useSearch()
    const { mutate } = useSimpleMutation({
        method: "post",
        url: "/review/check",
        queryKeyWithoutParams: ["reviewCheck"],
        params: searchParams,
        update: makeUpdatedReviewCheckQueryData,
    })
    return { mutate }
}
type ReviewCheckMutate = ReturnType<typeof useReviewCheckMutate>["mutate"]

const useMutateFromChanged = (mutate: ReviewCheckMutate) => {
    const changedReviewChecks = useReviewCheckCreateStore((state) => state.changedReviewChecks)
    const changedReviewChecksByMultiSelect = useReviewCheckCreateStore(
        (state) => state.changedReviewChecksByMultiSelect
    )
    const searchParams = route.useSearch()

    useEffect(() => {
        if (Object.entries(changedReviewChecks).length === 0) return
        if (Object.values(changedReviewChecksByMultiSelect).length > 0) return

        const timeout = setTimeout(async () => {
            // TODO: /review-check/create -> /review/check
            // TODO: /review-check -> /review/assignment
            // TODO: /review-check 과제 제작 -> /review/assignment/create
            const body = {
                student_id: searchParams.student_id,
                syllabus_id: searchParams.syllabus_id,
                changedReviewChecks,
            }
            mutate({ body, additionalData: changedReviewChecks })
        }, 500)
        return () => clearTimeout(timeout)
    }, [changedReviewChecks, changedReviewChecksByMultiSelect])
}

const useConvertRecentToChanged = (data: ReviewCheckCreateResponseData | undefined) => {
    const setChangedReviewChecksByMultiSelect = useReviewCheckCreateStore(
        (state) => state.setChangedReviewChecksByMultiSelect
    )
    const status = useReviewCheckCreateStore((state) => state.status)
    const recentReviewCheckInfoArray = useReviewCheckCreateStore((state) => state.recentReviewCheckInfoArray)
    const searchParams = route.useSearch()

    useEffect(() => {
        if (recentReviewCheckInfoArray.length === 0) return

        const newChangedReviewChecks: QuestionIdToRequestInfo = {}
        if (recentReviewCheckInfoArray.length === 1) {
            const recentReviewCheckInfo = recentReviewCheckInfoArray[0]
            const targetQuestion = findJoinedQuestion({ queryData: data, recentReviewCheckInfo })
            if (targetQuestion.review_check_status === status) return

            newChangedReviewChecks[targetQuestion.id] = {
                status,
                review_check_id: targetQuestion.review_check_id,
                topic_order: recentReviewCheckInfo.topic_order,
                step_order: recentReviewCheckInfo.step_order,
                assigned_session_student_id: targetQuestion.assigned_session_student_id,
            }
            updateReviewCheckQueryData({
                changedReviewChecks: newChangedReviewChecks,
                searchParams,
                storeCallback: () => setChangedReviewChecksByMultiSelect(newChangedReviewChecks),
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

                    newChangedReviewChecks[question.id] = {
                        status,
                        review_check_id: question.review_check_id,
                        topic_order: topic.order,
                        step_order: step.order,
                        assigned_session_student_id: question.assigned_session_student_id,
                    }
                })
            )
        )

        revertReviewCheckQueryDataAfterMultiSelect({ newChangedByMultiSelect: newChangedReviewChecks, searchParams })
        updateReviewCheckQueryData({
            changedReviewChecks: newChangedReviewChecks,
            searchParams,
            storeCallback: () => setChangedReviewChecksByMultiSelect(newChangedReviewChecks),
        })
    }, [recentReviewCheckInfoArray])
}

const useReviewCheck = () => {
    const { data } = useReviewCheckQuery()
    const { mutate } = useReviewCheckMutate()
    useMutateFromChanged(mutate)
    useConvertRecentToChanged(data)

    return { data }
}

export default useReviewCheck
