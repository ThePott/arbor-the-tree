import type { ReviewAssignment, SessionStatus } from "@/shared/interfaces"

export type ReviewAssignmentMetaInfo = ReviewAssignment & {
    bookTitleArray: string[]
    questionCount: number
    assigned_at: string | null
    status: SessionStatus | null
}
