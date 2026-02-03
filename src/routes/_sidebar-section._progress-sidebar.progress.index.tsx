import progressLoaderFn from "@/featuresPerRoute/_sidebar-section._progress-sidebar.progress/loader"
import ProgressPage from "@/featuresPerRoute/_sidebar-section._progress-sidebar.progress/page"
import ProgressPending from "@/featuresPerRoute/_sidebar-section._progress-sidebar.progress/pending"
import { createFileRoute } from "@tanstack/react-router"
import z from "zod/v3"

export const Route = createFileRoute("/_sidebar-section/_progress-sidebar/progress/")({
    component: ProgressPage,
    pendingComponent: ProgressPending,
    loader: ({ context: { queryClient } }) => progressLoaderFn(queryClient),
    validateSearch: z.object({
        student_id: z.string().optional(),
        classroom_id: z.string().optional(),
        syllabus_id: z.string().optional(),
    }),
})
