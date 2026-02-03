import ReviewCheckSyllabusCreatePage from "@/features/_sidebar._review-check.review-check.syllabus.$syllbus_id/page"
import ReviewCheckSyllabusCreatePending from "@/features/_sidebar._review-check.review-check.syllabus.$syllbus_id/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/_review-check/review-check/syllabus/$syllabus_id/")({
    component: ReviewCheckSyllabusCreatePage,
    pendingComponent: ReviewCheckSyllabusCreatePending,
})
