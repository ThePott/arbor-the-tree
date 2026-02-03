import ReviewCheckSyllabusPage from "@/featuresPerRoute/_sidebar-section._review-check-sidebar.review-check.syllabus/page"
import ReviewCheckSyllabusPending from "@/featuresPerRoute/_sidebar-section._review-check-sidebar.review-check.syllabus/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar-section/_review-check-sidebar/review-check/syllabus")({
    component: ReviewCheckSyllabusPage,
    pendingComponent: ReviewCheckSyllabusPending,
})
