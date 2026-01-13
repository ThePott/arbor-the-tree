import manageDeleteLoaderFn from "@/featuresPerRoute/manage.delete/loader"
import ManageDeletePage from "@/featuresPerRoute/manage.delete/page"
import ManageDeletePending from "@/featuresPerRoute/manage.delete/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/manage/delete")({
    component: ManageDeletePage,
    pendingComponent: ManageDeletePending,
    loader: ({ context: { queryClient } }) => manageDeleteLoaderFn({ queryClient }),
})
