import manageStudentLoaderFn from "@/features/manage.student/loader"
import ManageStudentPage from "@/features/manage.student/page"
import ManageStudentPending from "@/features/manage.student/pending"
import { manageStudentSearchSchema } from "@/features/manage.student/types"
import { ClientError } from "@/shared/error/clientError"
import { checkIsAllowed } from "@/shared/utils/check-is-allowed"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/manage/student")({
    component: ManageStudentPage,
    pendingComponent: ManageStudentPending,
    beforeLoad: () => {
        if (!checkIsAllowed("HELPER")) {
            throw ClientError.Unauthorized("이 페이지에 접근할 권한이 없습니다", {
                to: "/",
                label: "홈으로 이동",
            })
        }
    },
    loader: ({ context: { queryClient } }) => manageStudentLoaderFn(queryClient),
    validateSearch: manageStudentSearchSchema,
})
