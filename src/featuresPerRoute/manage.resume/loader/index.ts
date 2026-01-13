import { withHeadInstance } from "@/packages/api/axiosInstances"
import useGlobalStore from "@/shared/store/globalStore"
import type { EnsureQueryDataOptions, QueryClient, UndefinedInitialDataOptions } from "@tanstack/react-query"
import type { ExtendedResume } from "../types"

type ForWhat = "ensureQueryData" | "useQuery"
export const makeManageResumeQueryOptions = <T extends ForWhat>(): T extends "ensureQueryData"
    ? EnsureQueryDataOptions<ExtendedResume[], Error, ExtendedResume[], string[], never>
    : UndefinedInitialDataOptions<ExtendedResume[], Error, ExtendedResume[], string[]> => {
    const me = useGlobalStore.getState().me
    // TODO: custom error class 만들어야 함
    if (!me) throw new Error("---- Unauthorized")

    return {
        queryKey: ["resume"],
        queryFn: async () => (await withHeadInstance.get(`/auth/resume/user/${me.id}`)).data as ExtendedResume[],
    }
}

type ManageResumeLoaderFnProps = {
    queryClient: QueryClient
}
const manageResumeLoaderFn = async ({ queryClient }: ManageResumeLoaderFnProps) => {
    const responseData = await queryClient.ensureQueryData(makeManageResumeQueryOptions<"ensureQueryData">())
    return responseData
}

export default manageResumeLoaderFn
