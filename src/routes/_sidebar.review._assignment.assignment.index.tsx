import ReviewAssignmentPage from "@/features/_sidebar.review._assignment.assignment/page"
import ReviewAssignmentPending from "@/features/_sidebar.review._assignment.assignment/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/review/_assignment/assignment/")({
    component: ReviewAssignmentPage,
    pendingComponent: ReviewAssignmentPending,
})
