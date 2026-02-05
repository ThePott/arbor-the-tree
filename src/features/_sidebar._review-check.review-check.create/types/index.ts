import type { Book, Question, ReviewCheckStatus, SessionStatus, Step, Topic } from "@/shared/interfaces"

export type JoinedQuestion = Pick<Question, "id" | "name" | "page"> & {
    status: ReviewCheckStatus | null
    session_status: SessionStatus | null
}
export type ExtendedStep = Step & { questions: JoinedQuestion[] }
export type ExtendedTopic = Topic & { steps: ExtendedStep[] }
export type ExtendedBook = Pick<Book, "title"> & { topics: ExtendedTopic[] }

export type ReviewCheckCreateResponseData = ExtendedBook
