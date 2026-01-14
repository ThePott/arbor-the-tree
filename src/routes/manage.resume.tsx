import manageResumeLoaderFn from "@/featuresPerRoute/manage.resume/loader"
import ManageResumePage from "@/featuresPerRoute/manage.resume/page"
import ManageResumePending from "@/featuresPerRoute/manage.resume/pending"
import { ClientError } from "@/shared/error/clientError"
import useGlobalStore from "@/shared/store/globalStore"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/manage/resume")({
    component: ManageResumePage,
    pendingComponent: ManageResumePending,
    beforeLoad: () => {
        const me = useGlobalStore.getState().me
        const allowedRoleArray: string[] = ["MAINTAINER", "PRINCIPAL"]
        if (!me?.role || !allowedRoleArray.includes(me.role)) {
            throw ClientError.Unauthorized("이 페이지에 접근할 권한이 없습니다", {
                to: "/",
                label: "홈으로 이동",
            })
        }
    },
    loader: ({ context: { queryClient } }) => manageResumeLoaderFn({ queryClient }),
})
