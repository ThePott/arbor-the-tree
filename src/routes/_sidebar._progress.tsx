import ProgressSidebar from "@/features/_sidebar._progress/layout"
import progressLoaderFn from "@/features/_sidebar._progress/loader"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/_progress")({
    component: ProgressSidebar,
    loader: ({ context: { queryClient } }) => progressLoaderFn(queryClient),
})
