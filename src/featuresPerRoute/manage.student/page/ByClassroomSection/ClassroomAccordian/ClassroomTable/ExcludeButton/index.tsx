import type { ManageStudentLoaderResponseData } from "@/featuresPerRoute/manage.student/loader"
import { instance } from "@/packages/api/axiosInstances"
import Button from "@/packages/components/Button/Button"
import { debugMutation, debugRender } from "@/shared/config/debug/debug"
import type { ClassroomStudent } from "@/shared/interfaces"
import { useMutation } from "@tanstack/react-query"
import { X } from "lucide-react"

type ExcludeButtonProps = {
    classroom_student_id: string
}
const ExcludeButton = ({ classroom_student_id }: ExcludeButtonProps) => {
    debugRender("ExcludeButton %s", classroom_student_id)
    // NOTE: 반에서 학생 삭제
    const deleteMutation = useMutation({
        mutationFn: () => instance.delete(`/manage/classroom-student/${classroom_student_id}`),
        onMutate: async (_variables, context) => {
            debugMutation("ExcludeButton:onMutate - deleting classroom_student_id: %s", classroom_student_id)
            // NOTE: classroomStudent 지우기만 하면 됨
            await context.client.cancelQueries({ queryKey: ["manageStudent"] })
            const previous = context.client.getQueryData(["manageStudent"]) as ManageStudentLoaderResponseData
            const classroomStudentArray: ClassroomStudent[] = previous.classroomStudentArray.filter(
                (classroomStudent) => classroomStudent.id !== classroom_student_id
            )

            const newData: ManageStudentLoaderResponseData = {
                ...previous,
                classroomStudentArray,
            }
            context.client.setQueryData(["manageStudent"], newData)
            debugMutation("ExcludeButton:onMutate - cache updated, removed 1 classroomStudent")
            return { previous }
        },
        onError: (_error, _variables, onMutateResult, context) => {
            debugMutation("ExcludeButton:onError - rolling back")
            context.client.setQueryData(["manageStudent"], onMutateResult?.previous)
        },
        onSettled: (_data, _error, _variables, _onMutateResult, context) => {
            debugMutation("ExcludeButton:onSettled - invalidating queries")
            context.client.invalidateQueries({ queryKey: ["manageStudent"] })
        },
    })
    const handleClick = () => {
        deleteMutation.mutate()
    }
    return (
        <Button onClick={handleClick}>
            <X size={16} />
        </Button>
    )
}

export default ExcludeButton
