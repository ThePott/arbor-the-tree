import queryClient from "@/packages/api/queryClient"
import type { SidebarSearchParams } from "@/routes/_sidebar"
import { ClientError } from "@/shared/error/clientError"
import { produce } from "immer"
import type { ReviewCheckResponseData } from "../loader"
import useReviewCheckStore from "../store"
import type { IdToChangedInfo, IndexInfo, JoinedQuestion, ReviewCheckChangedInfo } from "../types"

export const checkIsMultiSelected = ({
    titleIndex: titleOrder,
    subtitleIndex: subtitleOrder,
    checkboxIndex: checkboxOrder,
}: IndexInfo): boolean => {
    const recentReviewCheckInfoArray = useReviewCheckStore.getState().recentIndexInfoArray
    const sortedRecentReviewCheckInfoArray = recentReviewCheckInfoArray.sort((a, b) => {
        if (a.titleIndex != b.titleIndex) return a.titleIndex - b.titleIndex
        if (a.subtitleIndex != b.subtitleIndex) return a.subtitleIndex - b.subtitleIndex
        return a.checkboxIndex - b.checkboxIndex
    })

    const length = recentReviewCheckInfoArray.length
    if (length === 0) return false
    if (length === 1) {
        // TODO: 선택된 게 나면 선택됐다.
        const reviewCheckInfo = recentReviewCheckInfoArray[0]
        if (
            reviewCheckInfo.titleIndex === titleOrder &&
            reviewCheckInfo.subtitleIndex === subtitleOrder &&
            reviewCheckInfo.checkboxIndex === checkboxOrder
        ) {
            return true
        }
        return false
    }

    const first = sortedRecentReviewCheckInfoArray[0]
    const second = sortedRecentReviewCheckInfoArray[1]

    if (
        first.titleIndex <= titleOrder &&
        titleOrder <= second.titleIndex &&
        first.subtitleIndex <= subtitleOrder &&
        subtitleOrder <= second.subtitleIndex &&
        first.checkboxIndex <= checkboxOrder &&
        checkboxOrder <= second.checkboxIndex
    ) {
        return true
    }
    return false
}

type FindJoinedQuestionProps<T extends ReviewCheckResponseData> = {
    queryData: T | undefined
    changedEntry?: [question_id: string, ReviewCheckChangedInfo]
    orderInfo?: IndexInfo
}
export const findJoinedQuestion = <T extends ReviewCheckResponseData>({
    queryData,
    changedEntry,
    orderInfo,
}: FindJoinedQuestionProps<T>): JoinedQuestion => {
    const question_id = changedEntry?.[0]
    const titleIndex = changedEntry?.[1].indexInfo.titleIndex ?? orderInfo?.titleIndex
    const subtitleIndex = changedEntry?.[1].indexInfo.subtitleIndex ?? orderInfo?.subtitleIndex
    const checkboxIndex = orderInfo?.checkboxIndex

    // NOTE: id로 찾을 수도 있고 order로 찾을 수도 있다 << orderInfo 넣느냐 안 넣느냐에 따라 달라짐 << 이건 유지해야 함
    // NOTE: order 없이 찾을 때 ---- mutate 할 때 addtional data 가지고 optimistic update. 이 땐 order info 넣지 않음
    // NOTE: order로 찾을 때 ---- detect recent to changed 할 때, 한 개만 다중 선택한 걸 changed 로 만들 땐 order info 만으로 찾아냄
    // NOTE: index === 0 은 정상이지만 falsy함. guard 할 때 주의
    if (!question_id && checkboxIndex === undefined) throw ClientError.Unexpected("오답 체크를 실패했어요")
    if (titleIndex === undefined || subtitleIndex === undefined) throw ClientError.Unexpected("오답 체크를 실패했어요")

    const targetTopic = queryData?.topics[titleIndex]
    if (!targetTopic) throw ClientError.Unexpected("오답 체크를 실패했어요")
    const targetStep = targetTopic.steps[subtitleIndex]
    if (!targetStep) throw ClientError.Unexpected("오답 체크를 실패했어요")
    const targetQuestion = targetStep.questions.find((elQuestion, index) => {
        if (question_id) return elQuestion.id === question_id
        return index === checkboxIndex
    })
    if (!targetQuestion) throw ClientError.Unexpected("오답 체크를 실패했어요")
    return targetQuestion
}

// NOTE: useSimpleMutation update에서도 사용되어야 하므로 export 되어야 함
type MakeUpdatedReviewCheckQueryData = {
    previous: ReviewCheckResponseData
    additionalData: IdToChangedInfo
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
    idToChangedInfo: IdToChangedInfo
    searchParams: SidebarSearchParams
    storeCallback: () => void
}
export const updateReviewCheckQueryData = ({
    idToChangedInfo,
    searchParams: { classroom_id, student_id, syllabus_id },
    storeCallback,
}: UpdateReviewCheckQueryData): void => {
    const queryKey = ["reviewCheck", classroom_id, student_id, syllabus_id]
    const previous = queryClient.getQueryData(queryKey) as ReviewCheckResponseData
    const newData = makeUpdatedReviewCheckQueryData({ previous, additionalData: idToChangedInfo })
    queryClient.setQueryData(queryKey, newData)

    storeCallback()
}

type MakeRevertedReviewChangedreviewChecksProps = {
    queryData: ReviewCheckResponseData
    newChangedIdToRequestInfoByMultiSelect: IdToChangedInfo
}
const makeRevertedReviewChangedreviewChecks = ({
    queryData,
    newChangedIdToRequestInfoByMultiSelect,
}: MakeRevertedReviewChangedreviewChecksProps): IdToChangedInfo => {
    // NOTE: old 중 new와 겹치는 부분은 revert에서 제외
    const oldChangedIdToRequestInfoByMultiSelect = {
        ...useReviewCheckStore.getState().idToChangedInfoByMultiSelect,
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
    newChangedIdToRequestInfoByMultiSelect: IdToChangedInfo
    searchParams: SidebarSearchParams
}
export const revertReviewCheckQueryDataAfterMultiSelect = ({
    newChangedIdToRequestInfoByMultiSelect,
    searchParams: { classroom_id, student_id, syllabus_id },
}: RevertReviewCheckQueryDataAfterMultiSelectProps) => {
    const queryKey = ["reviewCheck", classroom_id, student_id, syllabus_id]
    const queryData = queryClient.getQueryData(queryKey) as ReviewCheckResponseData
    const revertedIdToRequestInfo = makeRevertedReviewChangedreviewChecks({
        queryData,
        newChangedIdToRequestInfoByMultiSelect,
    })
    const newData = makeUpdatedReviewCheckQueryData({ previous: queryData, additionalData: revertedIdToRequestInfo })
    queryClient.setQueryData(queryKey, newData)
}
