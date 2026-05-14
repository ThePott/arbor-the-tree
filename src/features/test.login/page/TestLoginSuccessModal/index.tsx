import useTestLoginStore from "@/features/test.login/store"
import Modal from "@/packages/Modal"

const TestLoginSuccessModal = () => {
    const modalKey = useTestLoginStore((state) => state.modalKey)
    const setModalKey = useTestLoginStore((state) => state.setModalKey)

    if (modalKey !== "signupSuccess") return null
    return (
        <Modal isOn={modalKey === "signupSuccess"} onBackdropClick={() => setModalKey(null)}>
            <Modal.Title>테스트 계정을 생성했어요</Modal.Title>
            <Modal.ButtonSection>
                <Modal.Button role="confirm" onClick={() => setModalKey(null)}>
                    확인
                </Modal.Button>
            </Modal.ButtonSection>
        </Modal>
    )
}

export default TestLoginSuccessModal
