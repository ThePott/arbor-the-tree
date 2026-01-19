import manageStudentLoaderFn from "@/featuresPerRoute/manage.student/loader"
import ManageStudentPage from "@/featuresPerRoute/manage.student/page"
import ManageStudentPending from "@/featuresPerRoute/manage.student/pending"
import { manageStudentSearchSchema } from "@/featuresPerRoute/manage.student/types"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/manage/student")({
    component: ManageStudentPage,
    pendingComponent: ManageStudentPending,
    loader: ({ context: { queryClient } }) => manageStudentLoaderFn({ queryClient }),
    validateSearch: manageStudentSearchSchema,
})
