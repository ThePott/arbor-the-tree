import type {
    AttemptStatus,
    Book,
    OLD_ReviewAssginmentQuestion,
    OLD_ReviewAssignment,
    Question,
    SessionStatus,
    Step,
    Topic,
} from "@/shared/interfaces"

// NOTE: types for response.data
//// NOTE: types for response.data for syllabus review check
export type WithAttemptInfo = {
    attempt_id: string | null
    attempt_status: AttemptStatus | null
    attempt_status_visual: AttemptStatus | null
    isReviewed: boolean
    session_id: string | null // NOTE: idToChangedInfo에 들어 있어야 한다
    session_status: SessionStatus | null // NOTE: session이 할당된 것만 오답체크할 수 있다
}
export type QuestionWithAttemptInfo = Question & WithAttemptInfo
export type ExtendedStep = Step & { questions: QuestionWithAttemptInfo[] }
export type ExtendedTopic = Topic & { steps: ExtendedStep[] }
export type ExtendedBook = Pick<Book, "title"> & { topics: ExtendedTopic[] }

//// NOTE: types for response.data for assignment review check
export type ExtendedReviewAssignmentQuestion = Omit<OLD_ReviewAssginmentQuestion, "status"> & WithAttemptInfo // NOTE: this is inside of response.data
export type BookInAssignment = {
    bookTitle: string
    reviewAssignmentQuestions: ExtendedReviewAssignmentQuestion[]
}
export type AssignmentWithBooks = OLD_ReviewAssignment & {
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
          forWhat: "session"
          status: AttemptStatus | null
          indexInfo: IndexInfo // NOTE: optimistic update을 할 때 query data에서 target question을 찾는 데에 사용됨 -- `findJoinedQuestion`
          session_id: string | null // NOTE: session_id if syllabus, assignment_id otherwise, null if not assigned
      }
    | {
          forWhat: "assignment"
          status: AttemptStatus | null
          indexInfo: IndexInfo // NOTE: optimistic update을 할 때 query data에서 target question을 찾는 데에 사용됨 -- `findJoinedQuestion`
      }
export type IdToChangedInfo = Record<string, ReviewCheckChangedInfo>

// NOTE: types for checkbox grid and checkbox
// NOTE: parent_id를 joinedQuestion은 포함하고 있고, assignmentQuesion은 포함하고 있지 않다
//// NOTE: types for checkbox grid and checkbox - syllabus
export type WrappedQuestionForCheckbox = {
    indexInfo: IndexInfo
    question: QuestionWithAttemptInfo // NOTE: parent id(session_id) 포함되어 있음
}
export type PagenatedQuestionsForCheckboxGrid = {
    page: number
    questions: WrappedQuestionForCheckbox[]
}
//// NOTE: types for checkbox grid and checkbox - assignment
export type AssignmentQuestionForCheckbox = {
    indexInfo: IndexInfo
    assignmentQuestion: ExtendedReviewAssignmentQuestion // NOTE: this is inside of response.data
    assignment_id: string // NOTE: parent id 없기 때문에 주입해야
}
