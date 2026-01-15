import { instance } from "@/packages/api/axiosInstances"
import type { QueryClient } from "@tanstack/react-query"
import type { ExtendedClassroom, ExtendedStudent } from "../types"
type ManageStudentLoaderFnProps = { queryClient: QueryClient }
const manageStudentLoaderFn = async ({ queryClient }: ManageStudentLoaderFnProps) => {
    const extendedStudentArray = await queryClient.ensureQueryData({
        queryKey: ["student"],
        queryFn: async () => {
            const response = await instance.get("/manage/student")
            return response.data as { isolatedStudentArray: ExtendedStudent[]; classroomArray: ExtendedClassroom[] }
        },
    })
    return extendedStudentArray
}

export default manageStudentLoaderFn
