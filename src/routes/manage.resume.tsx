import ManageResumePage from "@/featuresPerRoute/manage.resume/page/ManageResumePage"
import ManageStudentPending from "@/featuresPerRoute/manage.student/pending/ManageStudentPending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/manage/resume")({
    component: ManageResumePage,
    pendingComponent: ManageStudentPending,
})
