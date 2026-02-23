import type { Book, ReviewCheck } from "@/shared/interfaces"

export type BookWithReviewChecks = Book & { reviewChecks: ReviewCheck[] }
