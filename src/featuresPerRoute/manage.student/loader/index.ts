import { withHeadInstance } from "@/packages/api/axiosInstances"
import type { QueryClient } from "@tanstack/react-query"
type ManageStudentLoaderFnProps = { queryClient: QueryClient }
const manageStudentLoaderFn = async ({ queryClient }: ManageStudentLoaderFnProps) => {
    const extendedStudentArray = await queryClient.ensureQueryData({
        queryKey: ["student"],
        queryFn: async () => {
            const response = await withHeadInstance.get("/manage/student")
            return response.data
        },
    })
    return extendedStudentArray
}

export default manageStudentLoaderFn
