import Modal from "@/packages/Modal"
import useBookWriteStore from "../bookWriteStore/bookWriteStore"
import { useNavigate } from "react-router"

const BWSuccessModal = () => {
    const setModalKey = useBookWriteStore((state) => state.setModalKey)
    const modalKey = useBookWriteStore((state) => state.modalKey)
    const title = useBookWriteStore((state) => state.title)
    const navigate = useNavigate()

    return (
        <Modal isOn={modalKey === "success"} onBackdropClick={() => setModalKey(null)}>
            <Modal.Title>{}</Modal.Title>
            <Modal.Body>잠시 후 다시 시도해주세요</Modal.Body>
            <Modal.ButtonSection>
                <Modal.Button role="confirm" onClick={() => setModalKey(null)}>
                    확인
                </Modal.Button>
            </Modal.ButtonSection>
        </Modal>
    )
}

export default BWSuccessModal
