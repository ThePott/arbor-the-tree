import { instance } from "@/packages/api/axiosInstances"
import type { AppUser } from "@/shared/interfaces"
import useGlobalStore from "@/shared/store/globalStore"
import type { QueryClient } from "@tanstack/react-query"

export const manageDeleteQueryOptions = {
    queryKey: ["all"],
    queryFn: async () => {
        // TODO: 여기 직접 id 보내는 게 아니라 토큰으로 처리하게 해야 함
        const me = useGlobalStore.getState().me
        if (!me) throw new Error("---- Unauthorized")
        const response = await instance.get(`/auth/all/user/${me.id}`)
        const extendedUserArray = response.data as AppUser[]
        return extendedUserArray
    },
}

const manageDeleteLoaderFn = async ({ queryClient }: { queryClient: QueryClient }) => {
    const userArray = await queryClient.ensureQueryData(manageDeleteQueryOptions)

    return userArray
}

export default manageDeleteLoaderFn
