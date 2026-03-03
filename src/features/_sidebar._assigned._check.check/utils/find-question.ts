import { ClientError } from "@/shared/error/clientError"
import type { ReviewCheckAssignmentResponseData, ReviewCheckResponseData } from "../loader"
import type { IndexInfo, QuestionWithAttemptInfo, ReviewCheckChangedInfo } from "../types"

type FindJoinedQuestionProps<T extends ReviewCheckResponseData> = {
    queryData: T | undefined
    changedEntry?: [question_id: string, ReviewCheckChangedInfo] // NOTE: used for optimistic update using additional data from mutate
    orderInfo?: IndexInfo // NOTE: used for detecting recent then merged to changed
}
export const findJoinedQuestion = <T extends ReviewCheckResponseData>({
    queryData,
    changedEntry,
    orderInfo,
}: FindJoinedQuestionProps<T>): QuestionWithAttemptInfo => {
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

type FindAssignmentQuestionProps<T extends ReviewCheckAssignmentResponseData> = {
    queryData: T | undefined
    changedEntry?: [question_id: string, ReviewCheckChangedInfo] // NOTE: used for optimistic update using additional data from mutate
    orderInfo?: IndexInfo // NOTE: used for detecting recent then merged to changed
}
export const findAssignmentQuestion = <T extends ReviewCheckAssignmentResponseData>({
    queryData,
    changedEntry,
    orderInfo,
}: FindAssignmentQuestionProps<T>) => {
    const review_assignment_question_id = changedEntry?.[0]
    const titleIndex = changedEntry?.[1].indexInfo.titleIndex ?? orderInfo?.titleIndex
    const subtitleIndex = changedEntry?.[1].indexInfo.subtitleIndex ?? orderInfo?.subtitleIndex
    const checkboxIndex = orderInfo?.checkboxIndex

    // NOTE: id로 찾을 수도 있고 order로 찾을 수도 있다 << orderInfo 넣느냐 안 넣느냐에 따라 달라짐 << 이건 유지해야 함
    // NOTE: order 없이 찾을 때 ---- mutate 할 때 addtional data 가지고 optimistic update. 이 땐 order info 넣지 않음
    // NOTE: order로 찾을 때 ---- detect recent to changed 할 때, 한 개만 다중 선택한 걸 changed 로 만들 땐 order info 만으로 찾아냄
    // NOTE: index === 0 은 정상이지만 falsy함. guard 할 때 주의
    if (!review_assignment_question_id && checkboxIndex === undefined)
        throw ClientError.Unexpected("오답 체크를 실패했어요")
    if (titleIndex === undefined || subtitleIndex === undefined) throw ClientError.Unexpected("오답 체크를 실패했어요")

    const targetAssignment = queryData?.[titleIndex]
    if (!targetAssignment) throw ClientError.Unexpected("오답 체크를 실패했어요")
    const targetBook = targetAssignment.books[subtitleIndex]
    if (!targetBook) throw ClientError.Unexpected("오답 체크를 실패했어요")
    const targetAssignmentQuestion = targetBook.questions.find((elQuestion, index) => {
        if (review_assignment_question_id) return elQuestion.id === review_assignment_question_id
        return index === checkboxIndex
    })
    if (!targetAssignmentQuestion) throw ClientError.Unexpected("오답 체크를 실패했어요")
    return targetAssignmentQuestion
}
