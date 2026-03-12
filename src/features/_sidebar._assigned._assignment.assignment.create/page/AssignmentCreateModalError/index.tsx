import Modal from "@/packages/Modal"
import useAssignmentCreateStore from "../../store"

const AssignmentCreateModalError = () => {
    const setModalKey = useAssignmentCreateStore((state) => state.setModalKey)
    const modalKey = useAssignmentCreateStore((state) => state.modalKey)
    const mutationError = useAssignmentCreateStore((state) => state.mutationError)

    return (
        <Modal isOn={modalKey === "error"} onBackdropClick={() => setModalKey(null)}>
            <Modal.Title>등록 중에 오류가 발생했어요</Modal.Title>
            <Modal.Body>{mutationError?.response?.data.message}</Modal.Body>
            <Modal.ButtonSection>
                <Modal.Button role="confirm" onClick={() => setModalKey(null)}>
                    확인
                </Modal.Button>
            </Modal.ButtonSection>
        </Modal>
    )
}

export default AssignmentCreateModalError
