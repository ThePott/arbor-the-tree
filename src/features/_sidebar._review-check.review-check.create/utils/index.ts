import queryClient from "@/packages/api/queryClient"
import type { SidebarSearchParams } from "@/routes/_sidebar"
import { ClientError } from "@/shared/error/clientError"
import { produce } from "immer"
import type { QuestionIdToInfo, ReviewCheckCreateResponseData } from "../types"

type UpdateReviewCheckCacheProps = {
    previous: ReviewCheckCreateResponseData
    additionalData: QuestionIdToInfo
}
export const updateReviewCheckCache = ({
    previous,
    additionalData,
}: UpdateReviewCheckCacheProps): ReviewCheckCreateResponseData => {
    const newData = produce(previous, (draft) => {
        const entryArray = Object.entries(additionalData)
        entryArray.forEach(([question_id, { topic_order, step_order, status }]) => {
            const targetTopic = draft.topics.find((elTopic) => elTopic.order === topic_order)
            if (!targetTopic) throw ClientError.Unexpected("오답 체크를 실패했어요")
            const targetStep = targetTopic.steps.find((elStep) => elStep.order === step_order)
            if (!targetStep) throw ClientError.Unexpected("오답 체크를 실패했어요")
            const targetQuestion = targetStep.questions.find((elQuestion) => elQuestion.id === question_id)
            if (!targetQuestion) throw ClientError.Unexpected("오답 체크를 실패했어요")
            targetQuestion.review_check_status_visual = status
        })
    })
    return newData
}

type UpdateReviewCheckCacheVisualProps = {
    changedReviewChecks: QuestionIdToInfo
    searchParams: SidebarSearchParams
    storeCallback: () => void
}
export const updateReviewCheckCacheVisual = ({
    changedReviewChecks,
    searchParams,
    storeCallback,
}: UpdateReviewCheckCacheVisualProps): void => {
    const queryKey = ["reviewCheck", searchParams]
    const previous = queryClient.getQueryData(queryKey) as ReviewCheckCreateResponseData
    const newData = updateReviewCheckCache({ previous, additionalData: changedReviewChecks })
    queryClient.setQueryData(queryKey, newData)

    storeCallback()
}
