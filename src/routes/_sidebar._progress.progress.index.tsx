import progressLoaderFn from "@/features/_sidebar._progress.progress/loader"
import ProgressPage from "@/features/_sidebar._progress.progress/page"
import ProgressPending from "@/features/_sidebar._progress.progress/pending"
import { createFileRoute } from "@tanstack/react-router"
import z from "zod/v3"

export const Route = createFileRoute("/_sidebar/_progress/progress/")({
    component: ProgressPage,
    pendingComponent: ProgressPending,
    loader: ({ context: { queryClient } }) => progressLoaderFn(queryClient),
    validateSearch: z.object({
        student_id: z.string().optional(),
        classroom_id: z.string().optional(),
        syllabus_id: z.string().optional(),
    }),
})
