import ProgressSidebar from "@/features/_sidebar._assigned._progress/layout"
import progressSidebarLoaderFn from "@/features/_sidebar._assigned._progress/loader"
import { createFileRoute } from "@tanstack/react-router"
import z from "zod/v3"

const validateSearch = z.object({
    is_assignment: z.boolean().optional(),
})

export const Route = createFileRoute("/_sidebar/_assigned/_progress")({
    component: ProgressSidebar,
    loaderDeps: ({ search: { classroom_id, student_id } }) => ({ classroom_id, student_id }),
    loader: ({ context: { queryClient }, deps: { classroom_id, student_id } }) =>
        progressSidebarLoaderFn({ queryClient, classroom_id, student_id }),
    validateSearch,
})
