import ReviewSidebarLayout from "@/features/_sidebar._review/layout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/_review")({
    component: ReviewSidebarLayout,
})
