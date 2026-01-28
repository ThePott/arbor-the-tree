import ReviewCheckBookPage from "@/featuresPerRoute/review-check.book/page"
import ReviewCheckBookPending from "@/featuresPerRoute/review-check.book/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/review-check/book/")({
    component: ReviewCheckBookPage,
    pendingComponent: ReviewCheckBookPending,
})
