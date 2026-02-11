import type { Book, Question, ReviewCheckStatus, SessionStatus, Step, Topic } from "@/shared/interfaces"

export type JoinedQuestion = Pick<Question, "id" | "name" | "page" | "order"> & {
    session_status: SessionStatus | null
    session_id: string | null
    review_check_status: ReviewCheckStatus | null
    review_check_status_visual: ReviewCheckStatus | null
    review_check_id: string | null
}
export type ExtendedStep = Step & { questions: JoinedQuestion[] }
export type ExtendedTopic = Topic & { steps: ExtendedStep[] }
export type ExtendedBook = Pick<Book, "title"> & { topics: ExtendedTopic[] }

export type ReviewCheckResponseData = ExtendedBook

// NOTE: recent에서 사용됨
export type ReviewCheckOrderInfo = {
    topic_order: number
    step_order: number
    question_order: number
}

// NOTE: changed, multi changed에 사용됨
export type QuestionIdToRequestInfo = Record<
    string, // NOTE: question_id
    {
        status: ReviewCheckStatus | null // NOTE: use to delete if null
        review_check_id: string | null // NOTE: use to patch if exists
        topic_order: number
        step_order: number
        session_id: string | null
    }
>

export type JoinedQuestionWithOrders = {
    topic_order: number
    step_order: number
    question: JoinedQuestion
}
export type PagenatedQuestions = {
    page: number
    questions: JoinedQuestionWithOrders[]
}
