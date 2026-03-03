import { makeReviewAssignmentQueryOptions } from "@/shared/queryOptions/reviewAssignmentQueryOptions"
import type { QueryClient } from "@tanstack/react-query"

type AssignmentLoaderFnProps = {
    queryClient: QueryClient
    classroom_id: string | undefined
    student_id: string | undefined
}
const assignmentLoaderFn = async ({ queryClient, classroom_id, student_id }: AssignmentLoaderFnProps) => {
    const assignmentMetaInfoArray = student_id
        ? await queryClient.ensureQueryData(makeReviewAssignmentQueryOptions({ classroom_id, student_id }))
        : []

    return { assignmentMetaInfoArray }
}

export default assignmentLoaderFn
