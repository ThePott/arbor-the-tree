import ProgressSummarizedPage from "@/featuresPerRoute/progress.summarized/page"
import ProgressSummarizedPending from "@/featuresPerRoute/progress.summarized/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/progress/summarized")({
    component: ProgressSummarizedPage,
    pendingComponent: ProgressSummarizedPending,
})
