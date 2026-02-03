import ProgressSidebar from "@/features/_sidebar._progress/layout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/_progress")({
    component: ProgressSidebar,
})
