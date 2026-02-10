import ReviewCheckPage from "@/features/_sidebar._review.review.check/page"
import ReviewCheckPending from "@/features/_sidebar._review.review.check/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/_review/review/check/")({
    component: ReviewCheckPage,
    pendingComponent: ReviewCheckPending,
})
