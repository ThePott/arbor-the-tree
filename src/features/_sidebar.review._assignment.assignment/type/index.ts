import type { ReviewAssignment } from "@/shared/interfaces"

export type ReviewAssignmentMetaInfo = ReviewAssignment & {
    bookTitleArray: string[]
    questionCount: number
    assigned_at: Date | null
}
