import ReviewCheckBookDetailPage from "@/featuresPerRoute/review-check.book.bookTitle/page"
import ReviewCheckBookDetailPending from "@/featuresPerRoute/review-check.book.bookTitle/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/review-check/book/$bookTitle")({
    component: ReviewCheckBookDetailPage,
    pendingComponent: ReviewCheckBookDetailPending,
})
