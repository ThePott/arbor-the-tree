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

// NOTE: types for response.data
//// NOTE: types for response.data for syllabus review check
export type CheckboxStatus = {
    review_check_status: ReviewCheckStatus | null
    review_check_status_visual: ReviewCheckStatus | null
    session_status: SessionStatus | null
}
export type JoinedQuestion = Pick<Question, "id" | "name" | "page" | "order"> &
    CheckboxStatus & { session_id: string | null }
export type ExtendedStep = Step & { questions: JoinedQuestion[] }
export type ExtendedTopic = Topic & { steps: ExtendedStep[] }
export type ExtendedBook = Pick<Book, "title"> & { topics: ExtendedTopic[] }

//// NOTE: types for response.data for assignment review check
export type ExtendedReviewAssignmentQuestion = Omit<ReviewAssginmentQuestion, "status"> & CheckboxStatus // NOTE: this is inside of response.data
export type BookInAssignment = {
    bookTitle: string
    reviewAssignmentQuestions: ExtendedReviewAssignmentQuestion[]
}
export type AssignmentWithBooks = ReviewAssignment & {
    books: BookInAssignment[]
    session_status: SessionStatus | null
    question_count: number
}

// NOTE: types for user interaction with checkbox
//// NOTE: types for user interaction with checkbox - recent에서 사용됨
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
      }
export type IdToChangedInfo = Record<string, ReviewCheckChangedInfo>

// NOTE: types for checkbox grid and checkbox
// NOTE: parent_id를 joinedQuestion은 포함하고 있고, assignmentQuesion은 포함하고 있지 않다
//// NOTE: types for checkbox grid and checkbox - syllabus
export type PagenatedQuestionsForCheckboxGrid = {
    page: number
    questions: JoinedQuestionForCheckbox[]
}
export type JoinedQuestionForCheckbox = {
    indexInfo: IndexInfo
    question: JoinedQuestion // NOTE: parent id(session_id) 포함되어 있음
}
//// NOTE: types for checkbox grid and checkbox - assignment
export type AssignmentQuestionForCheckbox = {
    indexInfo: IndexInfo
    assignmentQuestion: ExtendedReviewAssignmentQuestion // NOTE: this is inside of response.data
    assignment_id: string // NOTE: parent id 없기 때문에 주입해야
}
