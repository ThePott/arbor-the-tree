import manageStudentLoaderFn from "@/featuresPerRoute/manage.student/loader"
import ManageStudentPage from "@/featuresPerRoute/manage.student/page"
import ManageStudentPending from "@/featuresPerRoute/manage.student/pending"
import { createFileRoute } from "@tanstack/react-router"
import z from "zod/v3"

const manageStudentSearchSchema = z.object({
    by: z.enum(["classroom", "student"]).optional(),
})

export const Route = createFileRoute("/manage/student")({
    component: ManageStudentPage,
    pendingComponent: ManageStudentPending,
    loader: ({ context: { queryClient } }) => manageStudentLoaderFn({ queryClient }),
    validateSearch: manageStudentSearchSchema,
})
