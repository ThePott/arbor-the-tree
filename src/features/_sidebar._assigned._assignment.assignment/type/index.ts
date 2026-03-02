import type { ReviewAssignment } from "@/shared/interfaces"

export type ReviewAssignmentWithMetaInfo = ReviewAssignment & {
    bookTitleArray: string[]
    questionCount: number
}
