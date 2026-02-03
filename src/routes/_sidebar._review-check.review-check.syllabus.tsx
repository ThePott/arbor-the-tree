import ReviewCheckSyllabusPage from "@/features/_sidebar._review-check.review-check.syllabus/page"
import ReviewCheckSyllabusPending from "@/features/_sidebar._review-check.review-check.syllabus/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/_review-check/review-check/syllabus")({
    component: ReviewCheckSyllabusPage,
    pendingComponent: ReviewCheckSyllabusPending,
})
