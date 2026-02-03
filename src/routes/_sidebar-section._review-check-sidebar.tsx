import ReviewCheckSidebarLayout from "@/featuresPerRoute/_sidebar-section._review-check-sidebar/layout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar-section/_review-check-sidebar")({
    component: ReviewCheckSidebarLayout,
})
