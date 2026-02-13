import type { ExtendedStudent } from "@/features/manage.student/types"
import type { ReviewAssginmentQuestion, ReviewAssignment } from "@/shared/interfaces"

type BookWithReviewAssignmentQuestions = { title: string; reviewAssignmentQuestions: ReviewAssginmentQuestion[] }

export type ExtendedReviewAssignment = ReviewAssignment & {
    books: BookWithReviewAssignmentQuestions[] & { student: ExtendedStudent }
}
