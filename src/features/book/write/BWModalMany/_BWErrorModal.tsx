import Modal from "@/packages/Modal"
import useBookWriteStore from "../bookWriteStore/bookWriteStore"

const BWErrorModal = () => {
    const setModalKey = useBookWriteStore((state) => state.setModalKey)
    const modalKey = useBookWriteStore((state) => state.modalKey)

    return (
        <Modal isOn={modalKey === "error"} onBackdropClick={() => setModalKey(null)}>
            <Modal.Title>등록 중에 오류가 발생했어요</Modal.Title>
            <Modal.Body>잠시 후 다시 시도해주세요</Modal.Body>
            <Modal.ButtonSection>
                <Modal.Button role="confirm" onClick={() => setModalKey(null)}>
                    확인
                </Modal.Button>
            </Modal.ButtonSection>
        </Modal>
    )
}

export default BWErrorModal
