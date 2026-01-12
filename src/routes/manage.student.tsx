import ManageStudentPage from "@/featuresPerRoute/manage.student/page/ManageStudentPage"
import ManageStudentPending from "@/featuresPerRoute/manage.student/pending/ManageStudentPending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/manage/student")({
    component: ManageStudentPage,
    pendingComponent: ManageStudentPending,
})
