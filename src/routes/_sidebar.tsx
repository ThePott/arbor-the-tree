import SidebarSectionLayout from "@/features/_sidebar/layout"
import SidebarSectionPending from "@/features/_sidebar/pending"
import manageStudentLoaderFn from "@/features/manage.student/loader"
import { createFileRoute } from "@tanstack/react-router"
import z from "zod/v3"

// NOTE: 여기서는 sidebar를 나중에 제작하기 위한 Hstack, searchParams만 설정한다
const validateSearch = z.object({
    student_id: z.string().optional(),
    classroom_id: z.string().optional(),
    syllabus_id: z.string().optional(),
})
export type SidebarSearchParams = z.input<typeof validateSearch>
export const Route = createFileRoute("/_sidebar")({
    component: SidebarSectionLayout,
    loader: ({ context: { queryClient } }) => manageStudentLoaderFn(queryClient),
    pendingComponent: SidebarSectionPending,
    validateSearch,
})
