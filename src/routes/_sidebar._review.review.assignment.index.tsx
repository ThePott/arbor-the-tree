import ReviewAssignmentPage from "@/features/_sidebar._review.review.assignment/page"
import ReviewAssignmentPending from "@/features/_sidebar._review.review.assignment/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/_review/review/assignment/")({
    component: ReviewAssignmentPage,
    pendingComponent: ReviewAssignmentPending,
})
