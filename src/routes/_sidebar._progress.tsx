import ProgressSidebar from "@/features/_sidebar._progress/layout"
import progressLoaderFn from "@/features/_sidebar._progress/loader"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/_progress")({
    component: ProgressSidebar,
    // NOTE: 진도표 사이드바
    // NOTE: 학생과 문제집을 가져온다
    loaderDeps: ({ search: { classroom_id, student_id } }) => ({ classroom_id, student_id }),
    loader: ({ context: { queryClient }, deps: { classroom_id, student_id } }) =>
        progressLoaderFn({ queryClient, classroom_id, student_id }),
})
