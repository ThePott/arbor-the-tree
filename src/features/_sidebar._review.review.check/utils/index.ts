import queryClient from "@/packages/api/queryClient"
import type { SidebarSearchParams } from "@/routes/_sidebar"
import { ClientError } from "@/shared/error/clientError"
import { produce } from "immer"
import useReviewCheckCreateStore from "../store"
import type { JoinedQuestion, QuestionIdToRequestInfo, ReviewCheckOrderInfo, ReviewCheckResponseData } from "../types"

export const checkIsMultiSelected = ({ topic_order, step_order, question_order }: ReviewCheckOrderInfo): boolean => {
    const recentReviewCheckInfoArray = useReviewCheckCreateStore.getState().recentOrderInfoArray
    const sortedRecentReviewCheckInfoArray = recentReviewCheckInfoArray.sort((a, b) => {
        if (a.topic_order != b.topic_order) return a.topic_order - b.topic_order
        if (a.step_order != b.step_order) return a.step_order - b.step_order
        return a.question_order - b.question_order
    })

    const length = recentReviewCheckInfoArray.length
    if (length === 0) return false
    if (length === 1) {
        // TODO: 선택된 게 나면 선택됐다.
        const reviewCheckInfo = recentReviewCheckInfoArray[0]
        if (
            reviewCheckInfo.topic_order === topic_order &&
            reviewCheckInfo.step_order === step_order &&
            reviewCheckInfo.question_order === question_order
        ) {
            return true
        }
        return false
    }

    const first = sortedRecentReviewCheckInfoArray[0]
    const second = sortedRecentReviewCheckInfoArray[1]

    if (
        first.topic_order <= topic_order &&
        topic_order <= second.topic_order &&
        first.step_order <= step_order &&
        step_order <= second.step_order &&
        first.question_order <= question_order &&
        question_order <= second.question_order
    ) {
        return true
    }
    return false
}

type QuestionIdToInfoValue = QuestionIdToRequestInfo[string]
type FindJoinedQuestionProps<T extends ReviewCheckResponseData> = {
    queryData: T | undefined
    changedEntry?: [question_id: string, QuestionIdToInfoValue]
    recentReviewCheckInfo?: ReviewCheckOrderInfo
}
export const findJoinedQuestion = <T extends ReviewCheckResponseData>({
    queryData,
    changedEntry,
    recentReviewCheckInfo,
}: FindJoinedQuestionProps<T>): JoinedQuestion => {
    const question_id = changedEntry?.[0]
    const question_order = recentReviewCheckInfo?.question_order
    const topic_order = changedEntry?.[1].topic_order ?? recentReviewCheckInfo?.topic_order
    const step_order = changedEntry?.[1].step_order ?? recentReviewCheckInfo?.step_order

    if (!question_id && !question_order) throw ClientError.Unexpected("오답 체크를 실패했어요")
    if (!topic_order || !step_order) throw ClientError.Unexpected("오답 체크를 실패했어요")

    const targetTopic = queryData?.topics.find((elTopic) => elTopic.order === topic_order)
    if (!targetTopic) throw ClientError.Unexpected("오답 체크를 실패했어요")
    const targetStep = targetTopic.steps.find((elStep) => elStep.order === step_order)
    if (!targetStep) throw ClientError.Unexpected("오답 체크를 실패했어요")
    const targetQuestion = targetStep.questions.find((elQuestion) => {
        if (question_id) return elQuestion.id === question_id
        return elQuestion.order === question_order
    })
    if (!targetQuestion) throw ClientError.Unexpected("오답 체크를 실패했어요")
    return targetQuestion
}

// NOTE: useSimpleMutation update에서도 사용되어야 하므로 export 되어야 함
type MakeUpdatedReviewCheckQueryData = {
    previous: ReviewCheckResponseData
    additionalData: QuestionIdToRequestInfo
}
export const makeUpdatedReviewCheckQueryData = ({
    previous,
    additionalData,
}: MakeUpdatedReviewCheckQueryData): ReviewCheckResponseData => {
    const newData = produce(previous, (draft) => {
        const entryArray = Object.entries(additionalData)
        entryArray.forEach((entry) => {
            const targetQuestion = findJoinedQuestion({ queryData: draft, changedEntry: entry })
            const [_, { status }] = entry
            targetQuestion.review_check_status_visual = status
        })
    })
    return newData
}

type UpdateReviewCheckQueryData = {
    questionIdToRequestInfo: QuestionIdToRequestInfo
    searchParams: SidebarSearchParams
    storeCallback: () => void
}
export const updateReviewCheckQueryData = ({
    questionIdToRequestInfo,
    searchParams,
    storeCallback,
}: UpdateReviewCheckQueryData): void => {
    const queryKey = ["reviewCheck", searchParams]
    const previous = queryClient.getQueryData(queryKey) as ReviewCheckResponseData
    const newData = makeUpdatedReviewCheckQueryData({ previous, additionalData: questionIdToRequestInfo })
    queryClient.setQueryData(queryKey, newData)

    storeCallback()
}

type MakeRevertedReviewChangedreviewChecksProps = {
    queryData: ReviewCheckResponseData
    newChangedIdToRequestInfoByMultiSelect: QuestionIdToRequestInfo
}
const makeRevertedReviewChangedreviewChecks = ({
    queryData,
    newChangedIdToRequestInfoByMultiSelect,
}: MakeRevertedReviewChangedreviewChecksProps): QuestionIdToRequestInfo => {
    // NOTE: old 중 new와 겹치는 부분은 revert에서 제외
    const oldChangedIdToRequestInfoByMultiSelect = {
        ...useReviewCheckCreateStore.getState().changedIdToRequestInfoByMultiSelect,
    }
    Object.entries(newChangedIdToRequestInfoByMultiSelect).forEach(([question_id, _]) => {
        delete oldChangedIdToRequestInfoByMultiSelect[question_id]
    })

    const oldEntryArray = Object.entries(oldChangedIdToRequestInfoByMultiSelect)
    oldEntryArray.forEach((entry) => {
        const targetQuestion = findJoinedQuestion({ queryData, changedEntry: entry })
        entry[1].status = targetQuestion.review_check_status
    })

    const revertedChangedByMultiSelect = Object.fromEntries(oldEntryArray)

    return revertedChangedByMultiSelect
}

type RevertReviewCheckQueryDataAfterMultiSelectProps = {
    newChangedIdToRequestInfoByMultiSelect: QuestionIdToRequestInfo
    searchParams: SidebarSearchParams
}
export const revertReviewCheckQueryDataAfterMultiSelect = ({
    newChangedIdToRequestInfoByMultiSelect,
    searchParams,
}: RevertReviewCheckQueryDataAfterMultiSelectProps) => {
    const queryKey = ["reviewCheck", searchParams]
    const queryData = queryClient.getQueryData(queryKey) as ReviewCheckResponseData
    const revertedIdToRequestInfo = makeRevertedReviewChangedreviewChecks({
        queryData,
        newChangedIdToRequestInfoByMultiSelect,
    })
    const newData = makeUpdatedReviewCheckQueryData({ previous: queryData, additionalData: revertedIdToRequestInfo })
    queryClient.setQueryData(queryKey, newData)
}
