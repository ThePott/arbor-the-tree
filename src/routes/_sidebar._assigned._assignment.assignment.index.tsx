import assignmentLoaderFn from "@/features/_sidebar._assigned._assignment.assignment/loader"
import ReviewAssignmentPage from "@/features/_sidebar._assigned._assignment.assignment/page"
import ReviewAssignmentPending from "@/features/_sidebar._assigned._assignment.assignment/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/_assigned/_assignment/assignment/")({
    component: ReviewAssignmentPage,
    loaderDeps: ({ search: { classroom_id, student_id } }) => ({ classroom_id, student_id }),
    loader: ({ context: { queryClient }, deps: { classroom_id, student_id } }) =>
        assignmentLoaderFn({ queryClient, classroom_id, student_id }),
    pendingComponent: ReviewAssignmentPending,
})
