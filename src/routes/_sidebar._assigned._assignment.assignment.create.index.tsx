import reviewAssignmentCreateLoaderFn from "@/features/_sidebar._assigned._assignment.assignment.create/loader"
import ReviewAssignmentCreatePage from "@/features/_sidebar._assigned._assignment.assignment.create/page"
import ReviewAssignmentCreatePending from "@/features/_sidebar._assigned._assignment.assignment.create/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/_assigned/_assignment/assignment/create/")({
    component: ReviewAssignmentCreatePage,
    pendingComponent: ReviewAssignmentCreatePending,
    loaderDeps: ({ search: { classroom_id, student_id } }) => ({ classroom_id, student_id }),
    loader: ({ context: { queryClient }, deps: { classroom_id, student_id } }) =>
        reviewAssignmentCreateLoaderFn({ queryClient, classroom_id, student_id }),
})
