import ReviewCheckCreatePage from "@/featuresPerRoute/review-check.create/page"
import ReviewCheckCreatePending from "@/featuresPerRoute/review-check.create/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/review-check/create/")({
    component: ReviewCheckCreatePage,
    pendingComponent: ReviewCheckCreatePending,
})
