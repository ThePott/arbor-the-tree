import { instance } from "@/packages/api/axiosInstances"
import type { QueryClient } from "@tanstack/react-query"
import type { ExtendedClassroom, ExtendedStudent } from "../types"

type ResponseData = {
    studentArray: ExtendedStudent[]
    isolatedStudentArray: ExtendedStudent[]
    classroomArray: ExtendedClassroom[]
    classroomNameArray: string[]
}

type ManageStudentLoaderFnProps = { queryClient: QueryClient }
const manageStudentLoaderFn = async ({ queryClient }: ManageStudentLoaderFnProps) => {
    const extendedStudentArray = await queryClient.ensureQueryData({
        queryKey: ["manageStudent"],
        queryFn: async () => {
            const response = await instance.get("/manage/student")
            return response.data as ResponseData
        },
    })
    return extendedStudentArray
}

export default manageStudentLoaderFn
