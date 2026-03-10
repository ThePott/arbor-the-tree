import ProgressSidebar from "@/features/_sidebar._assigned._progress/layout"
import { createFileRoute } from "@tanstack/react-router"
import z from "zod/v3"

const validateSearch = z.object({
    is_assignment: z.boolean().optional(),
})

export const Route = createFileRoute("/_sidebar/_assigned/_progress")({
    component: ProgressSidebar,
    validateSearch,
})
