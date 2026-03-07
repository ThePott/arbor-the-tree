import { instance } from "@/packages/api/axiosInstances"
import type { AppUser, Resume } from "@/shared/interfaces"
import useGlobalStore from "@/shared/store/globalStore"
import type { QueryClient } from "@tanstack/react-query"
import type { AdditionalInfo, Me } from "../type/indes"

export const authMeQueryOptions = {
    queryKey: ["me"],
    queryFn: async () => {
        const response = await instance.get(`/auth/me`)
        const { additional_info, result, resume } = response.data as {
            additional_info: AdditionalInfo
            result: AppUser
            resume: Resume
        }
        const me: Me = { ...result, resume, additional_info }

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
