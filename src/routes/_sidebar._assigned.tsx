import assignedLoaderFn from "@/features/_sidebar._assigned/loader"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/_sidebar/_assigned")({
    component: Outlet,
    loaderDeps: ({ search: { classroom_id, student_id } }) => ({ classroom_id, student_id }),
    loader: ({ context: { queryClient }, deps: { classroom_id, student_id } }) =>
        assignedLoaderFn({ queryClient, classroom_id, student_id }),
})
