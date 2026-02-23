import { manageStudentLoaderQueryOptions } from "@/shared/queryOptions/manageStudentQueryOptions"
import type { QueryClient } from "@tanstack/react-query"

const sidebarLoaderFn = async (queryClient: QueryClient) => {
    const extendedStudentArray = await queryClient.ensureQueryData(manageStudentLoaderQueryOptions)
    return { extendedStudentArray }
}

export default sidebarLoaderFn
