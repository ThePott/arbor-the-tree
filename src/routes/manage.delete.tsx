import manageDeleteLoaderFn from "@/features/manage.delete/loader"
import ManageDeletePage from "@/features/manage.delete/page"
import ManageDeletePending from "@/features/manage.delete/pending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/manage/delete")({
    component: ManageDeletePage,
    pendingComponent: ManageDeletePending,
    loader: ({ context: { queryClient } }) => manageDeleteLoaderFn({ queryClient }),
})
