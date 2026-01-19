import Modal from "@/packages/Modal"
import { useMutation } from "@tanstack/react-query"
import { instance } from "@/packages/api/axiosInstances"
import { makeUlLul } from "@/shared/utils/stringManipulation"
import useManageStudentStore from "@/featuresPerRoute/manage.student/store"
import type { ManageStudentLoaderResponseData } from "@/featuresPerRoute/manage.student/loader"

const DeleteClassroomModal = () => {
    console.log("LOG: DeleteClassroomModal render")
    const modalKey = useManageStudentStore((state) => state.modalKey)
    const setModalKey = useManageStudentStore((state) => state.setModalKey)
    const selectedClassroom = useManageStudentStore((state) => state.selectedClassroom)
    const setSelectedClassroom = useManageStudentStore((state) => state.setSelectedClassroom)

    const deleteMutation = useMutation({
        mutationFn: (classroom_id: string) => instance.delete(`/manage/classroom/${classroom_id}`),
        onMutate: async (classroom_id, context) => {
            await context.client.cancelQueries({ queryKey: ["manageStudent"] })
            const previous = context.client.getQueryData(["manageStudent"]) as ManageStudentLoaderResponseData

            const newData: ManageStudentLoaderResponseData = {
                ...previous,
                classroomArray: previous.classroomArray.filter((classroom) => classroom.id !== classroom_id),
            }
            context.client.setQueryData(["manageStudent"], newData)

            return { previous }
        },
        onError: (_error, _variables, onMutateResult, context) => {
            context.client.setQueryData(["manageStudent"], onMutateResult?.previous)
        },
        onSettled: (_data, _error, _variables, _onMutateResult, context) => {
            context.client.invalidateQueries({ queryKey: ["manageStudent"] })
        },
    })

    const handleDelete = () => {
        const classroom_id = selectedClassroom?.id ?? "-1"
        setModalKey(null)
        deleteMutation.mutate(classroom_id)
        setSelectedClassroom(null)
    }

    const classroomName = selectedClassroom?.name ?? "알 수 없는 반"

    return (
        <Modal isOn={modalKey === "deleteClassroom"} onBackdropClick={() => setModalKey(null)}>
            <Modal.Title>{`"${classroomName}"${makeUlLul(classroomName)} 삭제핧까요?`}</Modal.Title>
            <Modal.Body>이 작업은 되돌릴 수 없어요</Modal.Body>
            <Modal.ButtonSection>
                <Modal.Button role="cancel" onClick={() => setModalKey(null)}>
                    취소
                </Modal.Button>
                <Modal.Button role="destruct" onClick={handleDelete}>
                    삭제
                </Modal.Button>
            </Modal.ButtonSection>
        </Modal>
    )
}

export default DeleteClassroomModal
