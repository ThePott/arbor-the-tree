import ReviewCheckCreatePage from "@/features/_sidebar._review-check.review-check.create/page"
import ReviewCheckCreatePending from "@/features/_sidebar._review-check.review-check.create/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/_review-check/review-check/create/")({
    component: ReviewCheckCreatePage,
    pendingComponent: ReviewCheckCreatePending,
})
