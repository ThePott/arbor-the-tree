import progressSessionLoaderFn from "@/features/_sidebar._progress.progress/loader"
import ProgressPage from "@/features/_sidebar._progress.progress/page"
import ProgressPending from "@/features/_sidebar._progress.progress/pending"
import { createFileRoute } from "@tanstack/react-router"

// NOTE: 진도표 내용물
// NOTE: 여기서 필요한 것
// NOTE: 1. progressSession
// NOTE: 2. assignment list
export const Route = createFileRoute("/_sidebar/_progress/progress/")({
    component: ProgressPage,
    pendingComponent: ProgressPending,
    loaderDeps: ({ search: { classroom_id, student_id, syllabus_id } }) => ({ classroom_id, student_id, syllabus_id }),
    loader: ({ context: { queryClient }, deps: { classroom_id, student_id, syllabus_id } }) =>
        progressSessionLoaderFn({ queryClient, classroom_id, student_id, syllabus_id }),
})
