import ReviewCheckSyllabusCreatePage from "@/featuresPerRoute/review-check.syllabus.$syllbus_id/page"
import ReviewCheckSyllabusCreatePending from "@/featuresPerRoute/review-check.syllabus.$syllbus_id/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar-section/_review-check-sidebar/review-check/syllabus/$syllabus_id/")({
    component: ReviewCheckSyllabusCreatePage,
    pendingComponent: ReviewCheckSyllabusCreatePending,
})
