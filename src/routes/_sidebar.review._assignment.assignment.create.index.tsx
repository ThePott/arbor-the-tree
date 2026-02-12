import ReviewAssignmentCreatePage from "@/features/_sidebar.review._assignment.assignment.create/page"
import ReviewAssignmentCreatePending from "@/features/_sidebar.review._assignment.assignment.create/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/review/_assignment/assignment/create/")({
    component: ReviewAssignmentCreatePage,
    pendingComponent: ReviewAssignmentCreatePending,
})
