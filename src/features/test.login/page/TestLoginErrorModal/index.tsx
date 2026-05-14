import useTestLoginStore from "@/features/test.login/store"
import Modal from "@/packages/Modal"
import { ClientError } from "@/shared/error/clientError"

const TestLoginErrorModal = () => {
    const modalKey = useTestLoginStore((state) => state.modalKey)
    const setModalKey = useTestLoginStore((state) => state.setModalKey)
    const error = useTestLoginStore((state) => state.error)

    if (modalKey !== "error") return null

    const code = error?.response?.data.code
    if (!code) throw ClientError.Unexpected

    const subject = code === "CONFLICT" ? "계정 생성" : "로그인"
    const body = code === "CONFLICT" ? "이미 가입된 이메일이에요" : "포트폴리오의 이용 안내를 확인해주세요"

    return (
        <Modal isOn={modalKey === "error"} onBackdropClick={() => setModalKey(null)}>
            <Modal.Title>{`테스트 ${subject}에 실패했어요`}</Modal.Title>
            <Modal.Body>{body}</Modal.Body>
            <Modal.ButtonSection>
                <Modal.Button role="confirm" onClick={() => setModalKey(null)}>
                    확인
                </Modal.Button>
            </Modal.ButtonSection>
        </Modal>
    )
}

export default TestLoginErrorModal
