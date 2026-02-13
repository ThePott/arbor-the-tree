import ReviewAssignmentLayout from "@/features/_sidebar.review._assignment/layout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/review/_assignment")({
    component: ReviewAssignmentLayout,
})
