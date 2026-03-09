import manageDeleteLoaderFn from "@/features/manage.delete/loader"
import ManageDeletePage from "@/features/manage.delete/page"
import ManageDeletePending from "@/features/manage.delete/pending"
import { ClientError } from "@/shared/error/clientError"
import { checkIsAllowed } from "@/shared/utils/check-is-allowed"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/manage/delete")({
    component: ManageDeletePage,
    pendingComponent: ManageDeletePending,
    beforeLoad: () => {
        if (!checkIsAllowed("PRINCIPAL")) {
            throw ClientError.Unauthorized("이 페이지에 접근할 권한이 없습니다", {
                to: "/",
                label: "홈으로 이동",
            })
        }
    },
    loader: ({ context: { queryClient } }) => manageDeleteLoaderFn({ queryClient }),
})
