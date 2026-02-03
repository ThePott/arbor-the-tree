import SidebarSectionLayout from "@/features/_sidebar/layout"
import sidebarSectionLoaderFn from "@/features/_sidebar/loader"
import SidebarSectionPending from "@/features/_sidebar/pending"
import { createFileRoute } from "@tanstack/react-router"
import z from "zod/v3"

export const Route = createFileRoute("/_sidebar")({
    component: SidebarSectionLayout,
    loader: ({ context: { queryClient } }) => sidebarSectionLoaderFn(queryClient),
    pendingComponent: SidebarSectionPending,
    validateSearch: z.object({
        student_id: z.string().optional(),
        classroom_id: z.string().optional(),
        syllabus_id: z.string().optional(),
    }),
})
