import { withHeadInstance } from "@/packages/api/axiosInstances"
import type { QueryClient } from "@tanstack/react-query"

export const manageDeleteQueryOptions = {
    queryKey: ["all"],
    queryFn: async () => (await withHeadInstance.get("/auth/user")).data,
}

const manageDeleteLoaderFn = async ({ queryClient }: { queryClient: QueryClient }) => {
    const userArray = await queryClient.ensureQueryData(manageDeleteQueryOptions)

    return userArray
}

export default manageDeleteLoaderFn
