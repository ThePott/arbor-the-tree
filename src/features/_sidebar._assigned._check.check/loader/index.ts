import { instance } from "@/packages/api/axiosInstances"
import { ClientError } from "@/shared/error/clientError"
import { type QueryClient } from "@tanstack/react-query"
import type { AssignmentForReviewCheck, BookForSession } from "../types"

type MakeReviewCheckQueryOptionsProps = {
    classroom_id: string | undefined
    student_id: string | undefined
    syllabus_id: string | undefined
}
export const makeReviewCheckQueryOptions = ({
    classroom_id,
    student_id,
    syllabus_id,
}: MakeReviewCheckQueryOptionsProps) => ({
    queryKey: ["reviewCheck", classroom_id, student_id, syllabus_id],
    queryFn: async () => {
        // NOTE: 다른 학생으로 넘어가면 이걸 지워야 함 mutation.onSuccess 이 아니라 query에서 하는 게 맞기는 한데
        const response = await instance.get("/review/check", { params: { classroom_id, student_id, syllabus_id } })
        return response.data as BookForSession
    },
})
export type ReviewCheckResponseData = BookForSession

type MakeReviewCheckAssignmentQueryOptionsProps = {
    classroom_id: string | undefined
    student_id: string | undefined
}
export const makeReviewCheckAssignmentQueryOptions = ({
    classroom_id,
    student_id,
}: MakeReviewCheckAssignmentQueryOptionsProps) => ({
    queryKey: ["reviewCheckAssignment", classroom_id, student_id],
    queryFn: async () => {
        const response = await instance.get("/review/check/assignment", {
            params: { classroom_id, student_id },
        })
        return response.data as AssignmentForReviewCheck[]
    },
})
export type ReviewCheckAssignmentResponseData = AssignmentForReviewCheck[]

// NOTE: 여기서 해야 하는 것
// NOTE: 그 학생, 반의 오답과제에 맞는 문제들, 오답 체크 현황 가져오기
// NOTE: 기본 문제집 오답 체크 현황 가져오기
type ReviewCheckLoaderFnProps = {
    queryClient: QueryClient
    classroom_id: string | undefined
    student_id: string | undefined
    syllabus_id: string | undefined
    is_assignment: boolean | undefined
}
const reviewCheckLoaderFn = async ({
    queryClient,
    classroom_id,
    student_id,
    syllabus_id,
    is_assignment,
}: ReviewCheckLoaderFnProps) => {
    if (!student_id) throw ClientError.Unexpected("학생을 선택해주세요")
    if (!syllabus_id && !is_assignment) throw ClientError.Unexpected("문제집 혹은 오답과제를 선택해주세요")
    // NOTE: 그냥 문제집의 오답체크를 가져온다

    const bookForSessionPromise = is_assignment
        ? Promise.resolve(undefined)
        : queryClient.ensureQueryData(makeReviewCheckQueryOptions({ classroom_id, student_id, syllabus_id }))
    const bookForAssignmentArrayPromise = is_assignment
        ? queryClient.ensureQueryData(makeReviewCheckAssignmentQueryOptions({ classroom_id, student_id }))
        : Promise.resolve([])

    const [bookForSession, bookForAssignmentArray] = await Promise.all([
        bookForSessionPromise,
        bookForAssignmentArrayPromise,
    ])
    return { bookForSession, bookForAssignmentArray }
}

export default reviewCheckLoaderFn
