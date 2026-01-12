import { withHeadInstance } from "@/packages/api/axiosInstances"
import type { Me } from "@/shared/interfaces"
import useGlobalStore from "@/shared/store/globalStore"
import type { QueryClient } from "@tanstack/react-query"

type ProfileLoaderFnProps = { queryClient: QueryClient }
const profileLoaderFn = async ({ queryClient }: ProfileLoaderFnProps) => {
    const state = useGlobalStore.getState()
    const me = state.me
    const setMe = state.setMe
    const setResume = state.setResume

    const response = await queryClient.ensureQueryData({
        queryKey: ["me"],
        // TODO: 지금은 app_user.id를 직접 넣지만 나중엔 액세스 토큰 바탕으로 자동으로 얻어내도록 해야 함
        queryFn: async () => withHeadInstance.get(`/auth/me/${me?.id}`),
    })
    const { result, resume, additional_info } = response.data
    const newMe = { ...result, ...additional_info } as Me

    setMe(newMe)
    setResume(resume)
}

export default profileLoaderFn
