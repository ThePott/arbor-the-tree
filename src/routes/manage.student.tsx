import manageStudentLoaderFn from "@/features/manage.student/loader"
import ManageStudentPage from "@/features/manage.student/page"
import ManageStudentPending from "@/features/manage.student/pending"
import { manageStudentSearchSchema } from "@/features/manage.student/types"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/manage/student")({
    component: ManageStudentPage,
    pendingComponent: ManageStudentPending,
    loader: ({ context: { queryClient } }) => manageStudentLoaderFn({ queryClient }),
    validateSearch: manageStudentSearchSchema,
})
