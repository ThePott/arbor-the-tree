import ReviewCheckPage from "@/featuresPerRoute/review-check/page"
import ReviewCheckPending from "@/featuresPerRoute/review-check/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar-section/_review-check-sidebar/review-check/")({
    component: ReviewCheckPage,
    pendingComponent: ReviewCheckPending,
})
