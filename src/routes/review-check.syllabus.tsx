import ReviewCheckSyllabusPage from "@/featuresPerRoute/review-check.syllabus/page"
import ReviewCheckSyllabusPending from "@/featuresPerRoute/review-check.syllabus/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/review-check/syllabus")({
    component: ReviewCheckSyllabusPage,
    pendingComponent: ReviewCheckSyllabusPending,
})
