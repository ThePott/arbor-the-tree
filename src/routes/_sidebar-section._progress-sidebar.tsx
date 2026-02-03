import ProgressSidebar from "@/featuresPerRoute/_sidebar-section._progress-sidebar/layout"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar-section/_progress-sidebar")({
    component: ProgressSidebar,
})
