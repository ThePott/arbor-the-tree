import { makeReviewAssignmentQueryOptions } from "@/features/_sidebar.review._assignment.assignment/loader"
import { instance } from "@/packages/api/axiosInstances"
import type { QueryClient } from "@tanstack/react-query"
import type { ConciseSyllabus } from "../types"

type SearchParamsForProgressSession = {
    classroom_id: string | undefined
    student_id: string | undefined
    syllabus_id: string | undefined
}
export const makeProgressSessionQueryOptions = ({
    classroom_id,
    student_id,
    syllabus_id,
}: SearchParamsForProgressSession) => ({
    queryKey: ["progressSession", classroom_id, student_id, syllabus_id],
    queryFn: async () => {
        // NOTE: api에 넘길 땐 searchParams 모두 사용해야 함 (문제집 하나만 볼 수도 있으니)
        const response = await instance.get("/progress/syllabus-with-sessions", {
            params: { classroom_id, student_id, syllabus_id },
        })
        return response.data as ConciseSyllabus[]
    },
})

type ProgressColumnSectionLoaderFnProps = SearchParamsForProgressSession & { queryClient: QueryClient }
const progressColumnsForSessionsLoaderFn = async ({
    queryClient,
    classroom_id,
    student_id,
    syllabus_id,
}: ProgressColumnSectionLoaderFnProps) => {
    const progressSessionPromise =
        classroom_id || student_id
            ? queryClient.ensureQueryData(makeProgressSessionQueryOptions({ classroom_id, student_id, syllabus_id }))
            : Promise.resolve(null)

    const assignmentPromise = student_id
        ? queryClient.ensureQueryData(makeReviewAssignmentQueryOptions({ classroom_id, student_id }))
        : Promise.resolve(null)

    const [progressSessionData, assignmentData] = await Promise.all([progressSessionPromise, assignmentPromise])
    return { progressSessionData, assignmentData }
}

export default progressColumnsForSessionsLoaderFn
