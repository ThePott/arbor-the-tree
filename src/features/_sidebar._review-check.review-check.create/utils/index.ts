import { ClientError } from "@/shared/error/clientError"
import { produce } from "immer"
import type { QuestionIdToInfo, ReviewCheckCreateResponseData } from "../types"

export const updateReviewCheckCache = ({
    previous,
    additionalData,
}: {
    previous: ReviewCheckCreateResponseData
    additionalData: QuestionIdToInfo
}) => {
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
