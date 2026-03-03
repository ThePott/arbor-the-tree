import { makeProgressSyllabusAssignedQueryOptions } from "@/shared/queryOptions/progressSyllabusAssignedQueryOptions"
import { makeReviewAssignmentQueryOptions } from "@/shared/queryOptions/reviewAssignmentQueryOptions"
import type { QueryClient } from "@tanstack/react-query"

type AssignedLoaderFnProps = {
    queryClient: QueryClient
    classroom_id: string | undefined
    student_id: string | undefined
}
const assignedLoaderFn = async ({ queryClient, classroom_id, student_id }: AssignedLoaderFnProps) => {
    const assignmentMetaInfoArrayPromise = student_id
        ? queryClient.ensureQueryData(makeReviewAssignmentQueryOptions({ classroom_id, student_id }))
        : Promise.resolve([])
    const assignedJoinedSyllabusArrayPromise =
        classroom_id || student_id
            ? queryClient.ensureQueryData(makeProgressSyllabusAssignedQueryOptions({ classroom_id, student_id }))
            : Promise.resolve([])
    const [assignmentMetaInfoArray, assignedJoinedSyllabusArray] = await Promise.all([
        assignmentMetaInfoArrayPromise,
        assignedJoinedSyllabusArrayPromise,
    ])
    return { assignmentMetaInfoArray, assignedJoinedSyllabusArray }
}

export default assignedLoaderFn
