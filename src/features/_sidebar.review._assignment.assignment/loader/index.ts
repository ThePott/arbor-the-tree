import { instance } from "@/packages/api/axiosInstances"
import type { QueryClient } from "@tanstack/react-query"

type ReviewAssignmentLoaderFnProps = {
    queryClient: QueryClient
    classroom_id: string | undefined
    student_id: string | undefined
}
const reviewAssignmentLoaderFn = async ({ queryClient, classroom_id, student_id }: ReviewAssignmentLoaderFnProps) => {
    // NOTE: 학생 선택 안 되면 호출 안 함
    if (!student_id) return null

    const data = queryClient.ensureQueryData({
        queryKey: ["reviewAssignment", classroom_id, student_id],
        queryFn: async () => {
            const response = await instance.get("/review/assignment", { params: { classroom_id, student_id } })
            return response.data
        },
    })
    return data
}

export default reviewAssignmentLoaderFn
