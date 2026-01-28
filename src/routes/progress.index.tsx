import progressLoaderFn from "@/featuresPerRoute/progress/loader"
import ProgressPage from "@/featuresPerRoute/progress/page"
import ProgressPending from "@/featuresPerRoute/progress/pending"
import { createFileRoute } from "@tanstack/react-router"
import z from "zod/v3"

export const Route = createFileRoute("/progress/")({
    component: ProgressPage,
    pendingComponent: ProgressPending,
    loader: ({ context: { queryClient } }) => progressLoaderFn(queryClient),
    validateSearch: z.object({
        student_id: z.string().optional(),
        classroom_id: z.string().optional(),
        syllabus_id: z.string().optional(),
    }),
})
