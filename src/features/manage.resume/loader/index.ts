import { instance } from "@/packages/api/axiosInstances"
import type { QueryClient } from "@tanstack/react-query"
import type { ExtendedResume } from "../types"

export const manageResumeQueryOptions = {
    queryKey: ["resume"],
    queryFn: async () => {
        const response = await instance.get(`/auth/resume`)
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
