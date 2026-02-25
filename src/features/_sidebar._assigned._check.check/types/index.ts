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
// NOTE: 얘를 checkbox로 내림
export type JoinedQuestionWithIndexInfo = {
    question: JoinedQuestion
    indexInfo: IndexInfo
}
export type PagenatedQuestions = {
    page: number
    questions: JoinedQuestionWithIndexInfo[]
}

// TODO: assignment_id는 response에는 없다.{ assignment_id: string | null } // NOTE: assigned: truthy, else null
// NOTE: this is for response data
export type ExtendedReviewAssignmentQuestion = Omit<ReviewAssginmentQuestion, "status"> & CheckboxStatus
export type AssignmentQuestionWithExtraInfo = ExtendedReviewAssignmentQuestion & {
    assignment_id: string
    indexInfo: IndexInfo
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

// TODO: 현재 문제
// TODO: 1. AssignmentQuestionWithExtraInfo 와 JoinedQuestionWithIndexInfo의 역할이 같은데 이름의 생김새는 너무 다르다
// TODO: 2. JoinedQuestionWithIndexInfo의 경우 makeFlat(util)에서 IndexInfo를 더한다 << 마찬가지로 assignmentQuesion에서도 그리 해야
// TODO: 3. JoinedQuestionWithIndexInfo의 경우 question 안에 기존 정보가 들어 있지만 AssignedQuestionWithExtraInfo는 그냥 1층에 원래 정보가 들어있다 ---- object의 생김새도 너무 다르다
// TODO: 4. 결과적으로 공유하고 있는게 많음에도 무엇을 공유하고 있는지 파악하기가 어렵다
// TODO: 5. AssignmentQuestionWithExtraInfo에서 assignmentQuestion 속성을 따로 만들면 review_check_status_visual 이 2층으로 들어가버려서 안 된다
