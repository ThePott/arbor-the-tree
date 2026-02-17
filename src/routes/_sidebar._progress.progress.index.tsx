import ProgressPage from "@/features/_sidebar._progress.progress/page"
import ProgressPending from "@/features/_sidebar._progress.progress/pending"
import { createFileRoute } from "@tanstack/react-router"

// NOTE: 진도표 내용물
// NOTE: 여기서 필요한 것
// NOTE: 1. progressSession
// NOTE: 2. assignment list
export const Route = createFileRoute("/_sidebar/_progress/progress/")({
    component: ProgressPage,
    pendingComponent: ProgressPending,
    loader: ({ context: { queryClient } }) => {},
})
