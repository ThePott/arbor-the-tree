import ReviewAssignmentCreatePage from "@/features/_sidebar._review.review.assignment.create/page"
import ReviewAssignmentCreatePending from "@/features/_sidebar._review.review.assignment.create/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/_review/review/assignment/create/")({
    component: ReviewAssignmentCreatePage,
    pendingComponent: ReviewAssignmentCreatePending,
})
