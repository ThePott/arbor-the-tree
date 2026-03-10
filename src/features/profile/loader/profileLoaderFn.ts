import { instance } from "@/packages/api/axiosInstances"
import useGlobalStore from "@/shared/store/globalStore"
import type { QueryClient } from "@tanstack/react-query"
import type { Me } from "../type/indes"

export const authMeQueryOptions = {
    queryKey: ["me"],
    queryFn: async () => {
        const response = await instance.get(`/auth/me`)
        const me = response.data as Me
        const state = useGlobalStore.getState()
        const setMe = state.setMe
        setMe(me)

        return me
    },
}

type ProfileLoaderFnProps = { queryClient: QueryClient }
const profileLoaderFn = async ({ queryClient }: ProfileLoaderFnProps) => {
    const me = await queryClient.ensureQueryData(authMeQueryOptions)
    return { me }
}

export default profileLoaderFn
