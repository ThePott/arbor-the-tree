import { instance } from "@/packages/api/axiosInstances"
import type { QueryClient } from "@tanstack/react-query"
import type { ExtendedClassroom, ExtendedStudent } from "../types"

export type ManageStudentLoaderResponseData = {
    studentArray: ExtendedStudent[]
    isolatedStudentArray: ExtendedStudent[]
    classroomArray: ExtendedClassroom[]
    classroomNameArray: string[]
}
export const ManageStudentLoaderQueryOptions = {
    queryKey: ["manageStudent"],
    queryFn: async () => {
        const response = await instance.get("/manage/student")
        return response.data as ManageStudentLoaderResponseData
    },
}

type ManageStudentLoaderFnProps = { queryClient: QueryClient }
const manageStudentLoaderFn = async ({ queryClient }: ManageStudentLoaderFnProps) => {
    const extendedStudentArray = await queryClient.ensureQueryData(ManageStudentLoaderQueryOptions)
    return extendedStudentArray
}

export default manageStudentLoaderFn
