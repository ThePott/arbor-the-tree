import type { ExtendedSyllabus } from "@/features/_sidebar/types"
import { instance } from "@/packages/api/axiosInstances"
import type { QueryClient } from "@tanstack/react-query"

// NOTE: 자동완성에 필요한 전체 문제집 목록을 받아오는 데에 사용됨
type ProgressLoaderFnProps = {
    queryClient: QueryClient
    classroom_id: string | undefined
    student_id: string | undefined
}
const progressSidebarLoaderFn = async ({ queryClient, classroom_id, student_id }: ProgressLoaderFnProps) => {
    const extendedSyllabusArray =
        classroom_id || student_id
            ? await queryClient.ensureQueryData({
                  queryKey: ["progressSyllabus"],
                  queryFn: async () => {
                      const response = await instance.get("/progress/syllabus")
                      return response.data as ExtendedSyllabus[]
                  },
              })
            : []
    return { extendedSyllabusArray }
}
export type ProgressSyllabusResponseData = ExtendedSyllabus[]

export default progressSidebarLoaderFn
