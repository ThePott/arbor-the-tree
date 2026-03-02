import type { OLD_ReviewAssignment, SessionStatus } from "@/shared/interfaces"

export type ReviewAssignmentMetaInfo = OLD_ReviewAssignment & {
    bookTitleArray: string[]
    questionCount: number
    assigned_at: string | null
    status: SessionStatus | null
}
