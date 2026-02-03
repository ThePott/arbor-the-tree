import ReviewCheckSidebarLayout from "@/features/_sidebar._review-check/layout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/_review-check")({
    component: ReviewCheckSidebarLayout,
})
