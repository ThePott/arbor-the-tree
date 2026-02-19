import type { AssignedJoinedSyllabus } from "@/features/_sidebar._progress.progress/types"
import type { ReviewAssignmentMetaInfo } from "@/features/_sidebar.review._assignment.assignment/type"
import manageStudentLoaderFn from "@/features/manage.student/loader"
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
            return response.data as ReviewAssignmentMetaInfo[]
        },
    }
}
export type ReviewAssignmentResponseData = ReviewAssignmentMetaInfo[]

type SidebarLoaderFnProps = {
    queryClient: QueryClient
    classroom_id: string | undefined
    student_id: string | undefined
}
const sidebarLoaderFn = async ({ queryClient, classroom_id, student_id }: SidebarLoaderFnProps) => {
    const assignmentMetaInfoArrayPromise = student_id
        ? queryClient.ensureQueryData(makeReviewAssignmentQueryOptions({ classroom_id, student_id }))
        : Promise.resolve([])
    const assignedJoinedSyllabusArrayPromise =
        classroom_id || student_id
            ? queryClient.ensureQueryData(makeProgressSyllabusAssignedQueryOptions({ classroom_id, student_id }))
            : Promise.resolve([])
    const extendedStudendArrayPromise = manageStudentLoaderFn(queryClient)

    const [assignmentMetaInfoArray, assignedJoinedSyllabusArray, extendedStudentArray] = await Promise.all([
        assignmentMetaInfoArrayPromise,
        assignedJoinedSyllabusArrayPromise,
        extendedStudendArrayPromise,
    ])
    return { assignmentMetaInfoArray, assignedJoinedSyllabusArray, extendedStudentArray }
}

export default sidebarLoaderFn
