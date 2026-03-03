import type { ReviewAssignmentWithMetaInfo } from "@/features/_sidebar._assigned._assignment.assignment/type"
import { instance } from "@/packages/api/axiosInstances"

type MakeReviewAssignmentQueryOptionsProps = {
    classroom_id: string | undefined
    student_id: string | undefined
}
export const makeReviewAssignmentQueryOptions = ({
    classroom_id,
    student_id,
}: MakeReviewAssignmentQueryOptionsProps) => {
    return {
        queryKey: ["reviewAssignment", classroom_id, student_id],
        queryFn: async () => {
            const response = await instance.get("/review/assignment", { params: { classroom_id, student_id } })
            return response.data as ReviewAssignmentWithMetaInfo[]
        },
    }
}
export type ReviewAssignmentResponseData = ReviewAssignmentWithMetaInfo[]
