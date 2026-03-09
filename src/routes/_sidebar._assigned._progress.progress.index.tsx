import progressSessionLoaderFn from "@/features/_sidebar._assigned._progress.progress/loader"
import ProgressPage from "@/features/_sidebar._assigned._progress.progress/page"
import ProgressPending from "@/features/_sidebar._assigned._progress.progress/pending"
import { ClientError } from "@/shared/error/clientError"
import { checkIsAllowed } from "@/shared/utils/check-is-allowed"
import { createFileRoute } from "@tanstack/react-router"

// NOTE: 진도표 내용물
// NOTE: 여기서 필요한 것
// NOTE: 1. progressSession
// NOTE: 2. assignment list
export const Route = createFileRoute("/_sidebar/_assigned/_progress/progress/")({
    component: ProgressPage,
    pendingComponent: ProgressPending,
    beforeLoad: () => {
        if (!checkIsAllowed("PARENT")) {
            throw ClientError.Unauthorized("이 페이지에 접근할 권한이 없습니다", {
                to: "/",
                label: "홈으로 이동",
            })
        }
    },
    loaderDeps: ({ search: { classroom_id, student_id, syllabus_id } }) => ({ classroom_id, student_id, syllabus_id }),
    loader: ({ context: { queryClient }, deps: { classroom_id, student_id, syllabus_id } }) =>
        progressSessionLoaderFn({ queryClient, classroom_id, student_id, syllabus_id }),
})
