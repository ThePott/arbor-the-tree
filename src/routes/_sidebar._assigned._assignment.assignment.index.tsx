import assignmentLoaderFn from "@/features/_sidebar._assigned._assignment.assignment/loader"
import ReviewAssignmentPage from "@/features/_sidebar._assigned._assignment.assignment/page"
import ReviewAssignmentPending from "@/features/_sidebar._assigned._assignment.assignment/pending"
import { ClientError } from "@/shared/error/clientError"
import { checkIsAllowed } from "@/shared/utils/check-is-allowed"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/_assigned/_assignment/assignment/")({
    component: ReviewAssignmentPage,
    loaderDeps: ({ search: { classroom_id, student_id } }) => ({ classroom_id, student_id }),
    beforeLoad: () => {
        if (!checkIsAllowed("PARENT")) {
            throw ClientError.Unauthorized("이 페이지에 접근할 권한이 없습니다", {
                to: "/",
                label: "홈으로 이동",
            })
        }
    },
    loader: ({ context: { queryClient }, deps: { classroom_id, student_id } }) =>
        assignmentLoaderFn({ queryClient, classroom_id, student_id }),
    pendingComponent: ReviewAssignmentPending,
})
