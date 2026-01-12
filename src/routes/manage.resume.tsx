import ManageResumePage from "@/featuresPerRoute/manage.resume/page"
import ManageResumePending from "@/featuresPerRoute/manage.resume/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/manage/resume")({
    component: ManageResumePage,
    pendingComponent: ManageResumePending,
})
