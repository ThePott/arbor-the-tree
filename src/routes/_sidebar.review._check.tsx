import ReviewCheckLayout from "@/features/_sidebar.review._check/layout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/review/_check")({
    component: ReviewCheckLayout,
})
