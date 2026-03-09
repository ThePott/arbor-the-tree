import reviewCheckLoaderFn from "@/features/_sidebar._assigned._check.check/loader"
import ReviewCheckPage from "@/features/_sidebar._assigned._check.check/page"
import ReviewCheckPending from "@/features/_sidebar._assigned._check.check/pending"
import { ClientError } from "@/shared/error/clientError"
import { checkIsAllowed } from "@/shared/utils/check-is-allowed"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/_assigned/_check/check/")({
    component: ReviewCheckPage,
    pendingComponent: ReviewCheckPending,
    beforeLoad: () => {
        if (!checkIsAllowed("STUDENT")) {
            throw ClientError.Unauthorized("이 페이지에 접근할 권한이 없습니다", {
                to: "/",
                label: "홈으로 이동",
            })
        }
    },
    loaderDeps: ({ search: { classroom_id, is_assignment, student_id, syllabus_id } }) => ({
        classroom_id,
        is_assignment,
        student_id,
        syllabus_id,
    }),
    loader: ({ context: { queryClient }, deps: { classroom_id, is_assignment, student_id, syllabus_id } }) =>
        reviewCheckLoaderFn({ queryClient, classroom_id, is_assignment, student_id, syllabus_id }),
})
