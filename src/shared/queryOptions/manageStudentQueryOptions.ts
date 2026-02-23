import type { ExtendedStudent } from "@/features/manage.student/types"
import { instance } from "@/packages/api/axiosInstances"
import type { Classroom, ClassroomStudent } from "../interfaces"

export type ManageStudentResponseData = {
    studentArray: ExtendedStudent[]
    classroomArray: Classroom[]
    classroomStudentArray: ClassroomStudent[]
}
export const manageStudentLoaderQueryOptions = {
    queryKey: ["manageStudent"],
    queryFn: async () => {
        const response = await instance.get("/manage/student")
        return response.data as ManageStudentResponseData
    },
}
