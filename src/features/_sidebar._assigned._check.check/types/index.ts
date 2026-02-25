import type {
    Book,
    Question,
    ReviewAssginmentQuestion,
    ReviewAssignment,
    ReviewCheckStatus,
    SessionStatus,
    Step,
    Topic,
} from "@/shared/interfaces"

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

// NOTE: recent에서 사용됨
export type IndexInfo = {
    titleIndex: number
    subtitleIndex: number
    checkboxIndex: number
}

export type ReviewCheckChangedInfo =
    | {
          forWhat: "syllabus"
          status: ReviewCheckStatus | null
          indexInfo: IndexInfo // NOTE: optimistic update을 할 때 query data에서 target question을 찾는 데에 사용됨 -- `findJoinedQuestion`
          session_id: string | null // NOTE: session_id if syllabus, assignment_id otherwise, null if not assigned
      }
    | {
          forWhat: "assignment"
          status: ReviewCheckStatus | null
          indexInfo: IndexInfo // NOTE: optimistic update을 할 때 query data에서 target question을 찾는 데에 사용됨 -- `findJoinedQuestion`
          assignment_id: string | null // NOTE: session_id if syllabus, assignment_id otherwise, null if not assigned
      }

// NOTE: question_id if for syllabus, reivew_assignment_question_id otherwise
export type IdToChangedInfo = Record<string, ReviewCheckChangedInfo>

// NOTE: pagenation을 위해서 사용함
export type JoinedQuestionWithIndexInfo = {
    question: JoinedQuestion
    indexInfo: IndexInfo
}
export type PagenatedQuestions = {
    page: number
    questions: JoinedQuestionWithIndexInfo[]
}

export type ExtendedReviewAssignmentQuestion = Omit<ReviewAssginmentQuestion, "status"> & {
    session_status: SessionStatus | null
    review_check_status: ReviewCheckStatus | null
    review_check_status_visual: ReviewCheckStatus | null
}
export type BookInAssignment = {
    bookTitle: string
    reviewAssignmentQuestions: ExtendedReviewAssignmentQuestion[]
}
export type AssignmentWithBooks = ReviewAssignment & {
    books: BookInAssignment[]
    session_status: SessionStatus | null
    question_count: number
}
