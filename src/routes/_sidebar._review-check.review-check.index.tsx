import ReviewCheckPage from "@/features/_sidebar._review-check.review-check/page"
import ReviewCheckPending from "@/features/_sidebar._review-check.review-check/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/_review-check/review-check/")({
    component: ReviewCheckPage,
    pendingComponent: ReviewCheckPending,
})
