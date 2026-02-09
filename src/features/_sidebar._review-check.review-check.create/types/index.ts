import type { Book, Question, ReviewCheckStatus, SessionStatus, Step, Topic } from "@/shared/interfaces"

export type JoinedQuestion = Pick<Question, "id" | "name" | "page" | "order"> & {
    session_status: SessionStatus | null
    review_check_status: ReviewCheckStatus | null
    review_check_id: string | null
    assigned_session_student_id: string | null
}
export type ExtendedStep = Step & { questions: JoinedQuestion[] }
export type ExtendedTopic = Topic & { steps: ExtendedStep[] }
export type ExtendedBook = Pick<Book, "title"> & { topics: ExtendedTopic[] }

export type ReviewCheckCreateResponseData = ExtendedBook
