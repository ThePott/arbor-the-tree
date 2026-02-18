import type { ExtendedSyllabus } from "@/features/_sidebar/types"
import { instance } from "@/packages/api/axiosInstances"
import type { QueryClient } from "@tanstack/react-query"

const progressLoaderFn = async (queryClient: QueryClient) => {
    const extendedSyllabusArray = await queryClient.ensureQueryData({
        queryKey: ["progressSyllabus"],
        queryFn: async () => {
            const response = await instance.get("/progress/syllabus")
            return response.data as ExtendedSyllabus[]
        },
    })
    return extendedSyllabusArray
}

export type ProgressSyllabusResponseData = ExtendedSyllabus[]
export default progressLoaderFn
