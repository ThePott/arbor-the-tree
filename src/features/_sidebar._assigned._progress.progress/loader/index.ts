import { instance } from "@/packages/api/axiosInstances"
import { makeReviewAssignmentQueryOptions } from "@/shared/queryOptions/reviewAssignmentQueryOptions"
import type { QueryClient } from "@tanstack/react-query"
import type { SyllabusWithSessions } from "../types"

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
        return response.data as SyllabusWithSessions[]
    },
})

type ProgressSectionLoaderFnProps = SearchParamsForProgressSession & { queryClient: QueryClient }
const progressSessionLoaderFn = async ({
    queryClient,
    classroom_id,
    student_id,
    syllabus_id,
}: ProgressSectionLoaderFnProps) => {
    const progressSessionPromise =
        classroom_id || student_id
            ? queryClient.ensureQueryData(makeProgressSessionQueryOptions({ classroom_id, student_id, syllabus_id }))
            : Promise.resolve([])

    const assignmentPromise = student_id
        ? queryClient.ensureQueryData(makeReviewAssignmentQueryOptions({ classroom_id, student_id }))
        : Promise.resolve([])

    const [progressSessionData, assignmentData] = await Promise.all([progressSessionPromise, assignmentPromise])
    return { progressSessionData, assignmentData }
}

export type ProgressSessionResponseData = SyllabusWithSessions[]
export default progressSessionLoaderFn
