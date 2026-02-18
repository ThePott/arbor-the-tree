import type { AssignedJoinedSyllabus } from "@/features/_sidebar._progress.progress/types"
import { makeReviewAssignmentQueryOptions } from "@/features/_sidebar.review._assignment.assignment/loader"
import type { ExtendedSyllabus } from "@/features/_sidebar/types"
import { instance } from "@/packages/api/axiosInstances"
import type { QueryClient } from "@tanstack/react-query"

type MakeProgressSyllabusAssignedQueryOptionsProps = {
    classroom_id: string | undefined
    student_id: string | undefined
}
export const makeProgressSyllabusAssignedQueryOptions = ({
    classroom_id,
    student_id,
}: MakeProgressSyllabusAssignedQueryOptionsProps) => ({
    // NOTE: progress에서만 mutate을 하므로 progress prefix 사용
    queryKey: ["progressSyllabusAssigned", classroom_id, classroom_id ? undefined : student_id],
    queryFn: async () => {
        const response = await instance.get("/progress/syllabus/assigned", {
            params: { classroom_id, student_id: classroom_id ? undefined : student_id },
        })
        return response.data as AssignedJoinedSyllabus[]
    },
    enabled: Boolean(classroom_id || student_id),
})
export type ProgressSyllabusAssignedResponseData = AssignedJoinedSyllabus[]

type ProgressLoaderFnProps = {
    queryClient: QueryClient
    classroom_id: string | undefined
    student_id: string | undefined
}
const progressLoaderFn = async ({ queryClient, classroom_id, student_id }: ProgressLoaderFnProps) => {
    const assignmentMetaInfoArrayPromise = student_id
        ? queryClient.ensureQueryData(makeReviewAssignmentQueryOptions({ classroom_id, student_id }))
        : Promise.resolve([])
    const extendedSyllabusArrayPromise =
        classroom_id || student_id
            ? queryClient.ensureQueryData({
                  queryKey: ["progressSyllabus"],
                  queryFn: async () => {
                      const response = await instance.get("/progress/syllabus")
                      return response.data as ExtendedSyllabus[]
                  },
              })
            : Promise.resolve([])
    const assignedJoinedSyllabusArrayPromise =
        classroom_id || student_id
            ? queryClient.ensureQueryData(makeProgressSyllabusAssignedQueryOptions({ classroom_id, student_id }))
            : Promise.resolve([])

    const [assignmentMetaInfoArray, extendedSyllabusArray, assignedJoinedSyllabusArray] = await Promise.all([
        assignmentMetaInfoArrayPromise,
        extendedSyllabusArrayPromise,
        assignedJoinedSyllabusArrayPromise,
    ])
    return { assignmentMetaInfoArray, extendedSyllabusArray, assignedJoinedSyllabusArray }
}
export type ProgressSyllabusResponseData = ExtendedSyllabus[]

export default progressLoaderFn
