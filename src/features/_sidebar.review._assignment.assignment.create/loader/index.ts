import { instance } from "@/packages/api/axiosInstances"
import type { QueryClient } from "@tanstack/react-query"
import type { BookWithReviewChecks } from "../types"

type MakeReviewAssignmentCreateQueryOptionsProps = {
    classroom_id: string | undefined
    student_id: string | undefined
}
export const makeReviewAssignmentCreateQueryOptions = ({
    classroom_id,
    student_id,
}: MakeReviewAssignmentCreateQueryOptionsProps) => {
    return {
        queryKey: ["reviewAssignmentCreate", classroom_id, student_id],
        queryFn: async () => {
            const response = await instance.get("/review/assignment/create", { params: { classroom_id, student_id } })
            return response.data as BookWithReviewChecks[]
        },
    }
}

type ReviewAssignmentCreateLoaderFnProps = {
    queryClient: QueryClient
    classroom_id: string | undefined
    student_id: string | undefined
}
const reviewAssignmentCreateLoaderFn = async ({
    queryClient,
    classroom_id,
    student_id,
}: ReviewAssignmentCreateLoaderFnProps) => {
    if (!student_id) return undefined

    const bookWithReviewChecksArray = await queryClient.ensureQueryData(
        makeReviewAssignmentCreateQueryOptions({ classroom_id, student_id })
    )
    return bookWithReviewChecksArray
}

export type ReviewAssignmentCreateResponseData = BookWithReviewChecks[]
export default reviewAssignmentCreateLoaderFn
