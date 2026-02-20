import reviewCheckLoaderFn from "@/features/_sidebar.review._check.check/loader"
import ReviewCheckPage from "@/features/_sidebar.review._check.check/page"
import ReviewCheckPending from "@/features/_sidebar.review._check.check/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/review/_check/check/")({
    component: ReviewCheckPage,
    pendingComponent: ReviewCheckPending,
    loaderDeps: ({ search: { classroom_id, is_assignment, student_id, syllabus_id } }) => ({
        classroom_id,
        is_assignment,
        student_id,
        syllabus_id,
    }),
    loader: ({ context: { queryClient }, deps: { classroom_id, is_assignment, student_id, syllabus_id } }) =>
        reviewCheckLoaderFn({ queryClient, classroom_id, is_assignment, student_id, syllabus_id }),
})
