import type { Book, OLD_ReviewCheck } from "@/shared/interfaces"
export type ExtendedReviewChecks = OLD_ReviewCheck & {
    topic_order: number
    step_order: number
    question_order: number
}
export type BookWithExtendedReviewChecks = Book & { extendedReviewChecks: ExtendedReviewChecks[] }
