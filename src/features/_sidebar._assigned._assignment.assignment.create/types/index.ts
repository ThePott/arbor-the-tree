import type { Book, ReviewCheck } from "@/shared/interfaces"
export type ExtendedReviewChecks = ReviewCheck & {
    topic_order: number
    step_order: number
    question_order: number
}
export type BookWithExtendedReviewChecks = Book & { extendedReviewChecks: ExtendedReviewChecks[] }
