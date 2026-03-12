import manageResumeLoaderFn from "@/features/manage.resume/loader"
import ManageResumePage from "@/features/manage.resume/page"
import ManageResumePending from "@/features/manage.resume/pending"
import { ClientError } from "@/shared/error/clientError"
import { checkIsAllowed } from "@/shared/utils/check-is-allowed"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/manage/resume")({
    component: ManageResumePage,
    pendingComponent: ManageResumePending,
    beforeLoad: () => {
        if (!checkIsAllowed("HELPER")) {
            throw ClientError.Unauthorized("이 페이지에 접근할 권한이 없습니다", {
                to: "/",
                label: "홈으로 이동",
            })
        }
    },
    loader: ({ context: { queryClient } }) => manageResumeLoaderFn({ queryClient }),
})
