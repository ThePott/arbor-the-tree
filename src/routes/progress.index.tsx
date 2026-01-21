import progressLoaderFn from "@/featuresPerRoute/progress/loader"
import ProgressPage from "@/featuresPerRoute/progress/page"
import ProgressPending from "@/featuresPerRoute/progress/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/progress/")({
    component: ProgressPage,
    pendingComponent: ProgressPending,
    loader: ({ context: { queryClient } }) => progressLoaderFn(queryClient),
})
