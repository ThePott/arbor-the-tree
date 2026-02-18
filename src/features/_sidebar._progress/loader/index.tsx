import { makeReviewAssignmentQueryOptions } from "@/features/_sidebar.review._assignment.assignment/loader"
import type { ExtendedSyllabus } from "@/features/_sidebar/types"
import { instance } from "@/packages/api/axiosInstances"
import type { QueryClient } from "@tanstack/react-query"

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
        student_id || classroom_id
            ? queryClient.ensureQueryData({
                  queryKey: ["progressSyllabus"],
                  queryFn: async () => {
                      const response = await instance.get("/progress/syllabus")
                      return response.data as ExtendedSyllabus[]
                  },
              })
            : Promise.resolve([])

    const [assignmentMetaInfoArray, extendedSyllabusArray] = await Promise.all([
        assignmentMetaInfoArrayPromise,
        extendedSyllabusArrayPromise,
    ])
    return { assignmentMetaInfoArray, extendedSyllabusArray }
}

export type ProgressSyllabusResponseData = ExtendedSyllabus[]
export default progressLoaderFn
