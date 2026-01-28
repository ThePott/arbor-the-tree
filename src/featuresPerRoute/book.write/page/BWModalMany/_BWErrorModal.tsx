import Modal from "@/packages/Modal"
import { debugRender } from "@/shared/config/debug/debug"
import useBookWriteStore from "../bookWriteStore/bookWriteStore"

const BWErrorModal = () => {
    debugRender("BWErrorModal")
    const setModalKey = useBookWriteStore((state) => state.setModalKey)
    const modalKey = useBookWriteStore((state) => state.modalKey)
    const mutationError = useBookWriteStore((state) => state.mutationError)

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

export default BWErrorModal
