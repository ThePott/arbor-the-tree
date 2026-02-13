import reviewAssignmentLoaderFn from "@/features/_sidebar.review._assignment.assignment/loader"
import ReviewAssignmentPage from "@/features/_sidebar.review._assignment.assignment/page"
import ReviewAssignmentPending from "@/features/_sidebar.review._assignment.assignment/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/review/_assignment/assignment/")({
    component: ReviewAssignmentPage,
    pendingComponent: ReviewAssignmentPending,
    loaderDeps: ({ search: { classroom_id, student_id } }) => ({ classroom_id, student_id }),
    loader: ({ context: { queryClient }, deps: { classroom_id, student_id } }) =>
        reviewAssignmentLoaderFn({ queryClient, classroom_id, student_id }),
})
