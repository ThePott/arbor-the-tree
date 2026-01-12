import ManageDeletePage from "@/featuresPerRoute/manage.delete/page/ManageDeletePage"
import ManageDeletePending from "@/featuresPerRoute/manage.delete/pending/ManageDeletePending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/manage/delete")({
    component: ManageDeletePage,
    pendingComponent: ManageDeletePending,
})
