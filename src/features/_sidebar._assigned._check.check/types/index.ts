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
// NOTE: 그냥 assignment의 경우 forEach의 인덱스를 order 처럼 사용하면 되지
//        data?.topics.forEach((topic) =>
//            topic.steps.forEach((step) =>
//                step.questions.forEach((question) => {
//                    const isMultiSelected = checkIsMultiSelected({
//                        topic_order: topic.order,
//                        step_order: step.order,
//                        question_order: question.order,
//                    })
//                    if (!isMultiSelected) return
//
//                    newChangedIdToRequestInfo[question.id] = {
//                        status,
//                        review_check_id: question.review_check_id,
//                        topic_order: topic.order,
//                        step_order: step.order,
//                        session_id: question.session_id,
//                    }
//                })
//            )
//        )

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

// NOTE: api에게 필요한 건 id(key), session_id, status
// NOTE: id - question id or assignment question id
// NOTE: 오답 체크를 특정짓기 위해 session_student_question_id 사용
// NOTE: assignment question은 그냥 그대로 사용하면 되지. <- session_id 불필요?? <- 이거 안 주면 join하고 걸러내는 게 귀찮아짐
// NOTE: assignment의 경우, assignment id 를 question_id info에 주입
// NOTE: 이름은 그대로 사용
// NOTE: question_id: assignment_question_id를 겸함
// NOTE: session_id: assignment_id를 겸함 ... << 겸하지 않는 게 나아보이는데...
// NOTE: review_check_id << patch할지 post할지 결정하는 역할... << upsert로 바뀌어서 이제 불필요하다

// TODO: 대전제
// TODO: 공통 로직 고민
// TODO: 공통 로직 세움
// TODO: syllabus review check 복구
// TODO: assignment review check 생성

// TODO: order info commonize
// TODO: title order, subtitle order, checkbox order
// TODO:
// TODO:
// TODO:

// TODO: review_check_id를 지워도 문제 없이 upsert 되는지 확인

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
