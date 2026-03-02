import type { ReviewAssignment, SessionStatus } from "@/shared/interfaces"

export type ReviewAssignmentWithMetaInfo = ReviewAssignment & {
    bookTitleArray: string[]
    questionCount: number
    status: SessionStatus | null
}
