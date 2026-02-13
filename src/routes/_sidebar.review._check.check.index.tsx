import ReviewCheckPage from "@/features/_sidebar.review._check.check/page"
import ReviewCheckPending from "@/features/_sidebar.review._check.check/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/review/_check/check/")({
    component: ReviewCheckPage,
    pendingComponent: ReviewCheckPending,
})
