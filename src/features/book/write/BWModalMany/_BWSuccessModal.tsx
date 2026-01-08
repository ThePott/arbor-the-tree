import Modal from "@/packages/Modal"
import useBookWriteStore from "../bookWriteStore/bookWriteStore"
import { useNavigate } from "react-router"
import { makeUlLul } from "@/shared/utils/stringManipulation"

const BWSuccessModal = () => {
    const setModalKey = useBookWriteStore((state) => state.setModalKey)
    const modalKey = useBookWriteStore((state) => state.modalKey)
    const title = useBookWriteStore((state) => state.title)
    const navigate = useNavigate()

    const handleConfirm = () => {
        navigate("/book")
        setModalKey(null)
    }

    return (
        <Modal isOn={modalKey === "success"} onBackdropClick={handleConfirm}>
            <Modal.Title>{`"${title}"${makeUlLul(title)} 등록했어요`}</Modal.Title>
            <Modal.Body>확인을 누르면 문제집 관리페이지로 이동해요</Modal.Body>
            <Modal.ButtonSection>
                <Modal.Button role="confirm" onClick={handleConfirm}>
                    확인
                </Modal.Button>
            </Modal.ButtonSection>
        </Modal>
    )
}

export default BWSuccessModal
