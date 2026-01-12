import { withHeadInstance } from "@/packages/api/axiosInstances"
import useGlobalStore from "@/shared/store/globalStore"
import type { QueryClient } from "@tanstack/react-query"

type ManageResumeLoaderFnProps = {
    queryClient: QueryClient
}
const manageResumeLoaderFn = async ({ queryClient }: ManageResumeLoaderFnProps) => {
    // TODO: 액세스 토큰으로 사용자 인증을 해서
    // TODO: 이렇게 user id 를 직접 보낼 필요가 없게 해야 함
    const me = useGlobalStore.getState().me
    if (!me) throw new Error("---- Unauthorized (no me)")

    const response = await queryClient.ensureQueryData({
        queryKey: ["resume"],
        queryFn: async () => await withHeadInstance.get(`/auth/resume/user/${me.id}`),
    })

    return response.data
}

export default manageResumeLoaderFn
