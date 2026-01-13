import { withHeadInstance } from "@/packages/api/axiosInstances"
import useGlobalStore from "@/shared/store/globalStore"
import type { QueryClient } from "@tanstack/react-query"
import type { ExtendedResume } from "../types"

export const manageResumeQueryOptions = {
    queryKey: ["resume"],
    queryFn: async () => {
        const me = useGlobalStore.getState().me
        // NOTE: 커스텀 에러 클래스 만들어야
        if (!me) throw new Error("---- Unauthorized")
        const response = await withHeadInstance.get(`/auth/resume/user/${me.id}`)
        const extendedResumeArray = response.data as ExtendedResume[]
        return extendedResumeArray
    },
}

type ManageResumeLoaderFnProps = {
    queryClient: QueryClient
}
const manageResumeLoaderFn = async ({ queryClient }: ManageResumeLoaderFnProps) => {
    const responseData = await queryClient.ensureQueryData(manageResumeQueryOptions)
    return responseData
}

export default manageResumeLoaderFn
