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
export type ReviewCheckOrderInfo = {
    topic_order: number
    step_order: number
    question_order: number
}

export type CheckOrderInfo = {
    titleOrder: number
    stepOrder: number
    checkboxOrder: number
}

// NOTE: changed, multi changed에 사용됨
export type QuestionIdToRequestInfo = Record<
    string, // NOTE: question_id
    {
        status: ReviewCheckStatus | null // NOTE: use to delete if null
        review_check_id: string | null // NOTE: use to patch if exists, NOT used to specify review check in api
        topic_order: number // TODO: api에서 이건 필요 없는데 왜 넣었지??
        step_order: number
        session_id: string | null // NOTE: session_id -> api에서 session 내의 문제 수와, 오답 체크된 문제 수를 비교해서 완료 여부 판단
    }
>

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

export type JoinedQuestionWithOrders = {
    topic_order: number
    step_order: number
    question: JoinedQuestion
}
export type PagenatedQuestions = {
    page: number
    questions: JoinedQuestionWithOrders[]
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
