import type { ReviewAssginmentQuestion, ReviewAssignment } from "@/shared/interfaces"

type BookWithReviewAssignmentQuestions = { title: string; reviewAssignmentQuestions: ReviewAssginmentQuestion[] }

export type ExtendedReviewAssignment = ReviewAssignment & {
    books: BookWithReviewAssignmentQuestions[]
}
