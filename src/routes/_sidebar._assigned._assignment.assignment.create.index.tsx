import reviewAssignmentCreateLoaderFn from "@/features/_sidebar._assigned._assignment.assignment.create/loader"
import ReviewAssignmentCreatePage from "@/features/_sidebar._assigned._assignment.assignment.create/page"
import ReviewAssignmentCreatePending from "@/features/_sidebar._assigned._assignment.assignment.create/pending"
import { ClientError } from "@/shared/error/clientError"
import { checkIsAllowed } from "@/shared/utils/check-is-allowed"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/_assigned/_assignment/assignment/create/")({
    component: ReviewAssignmentCreatePage,
    pendingComponent: ReviewAssignmentCreatePending,
    beforeLoad: () => {
        if (!checkIsAllowed("HELPER")) {
            throw ClientError.Unauthorized("이 페이지에 접근할 권한이 없습니다", {
                to: "/",
                label: "홈으로 이동",
            })
        }
    },
    loaderDeps: ({ search: { classroom_id, student_id } }) => ({ classroom_id, student_id }),
    loader: ({ context: { queryClient }, deps: { classroom_id, student_id } }) =>
        reviewAssignmentCreateLoaderFn({ queryClient, classroom_id, student_id }),
})
