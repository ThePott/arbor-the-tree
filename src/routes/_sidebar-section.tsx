import SidebarSectionLayout from "@/featuresPerRoute/_sidebar-section/layout"
import sidebarSectionLoaderFn from "@/featuresPerRoute/_sidebar-section/loader"
import SidebarSectionPending from "@/featuresPerRoute/_sidebar-section/pending"
import { createFileRoute } from "@tanstack/react-router"
import z from "zod/v3"

export const Route = createFileRoute("/_sidebar-section")({
    component: SidebarSectionLayout,
    loader: ({ context: { queryClient } }) => sidebarSectionLoaderFn(queryClient),
    pendingComponent: SidebarSectionPending,
    validateSearch: z.object({
        student_id: z.string().optional(),
        classroom_id: z.string().optional(),
        syllabus_id: z.string().optional(),
    }),
})
