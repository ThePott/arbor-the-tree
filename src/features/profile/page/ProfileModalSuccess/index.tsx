import useProfileStore from "@/features/profile/store"
import Modal from "@/packages/Modal"
import type { Role } from "@/shared/interfaces"

type ProfileModalSuccessProps = {
    role: Role | null
}
const ProfileModalSuccess = ({ role }: ProfileModalSuccessProps) => {
    const modalKey = useProfileStore((state) => state.modalKey)
    const setModalKey = useProfileStore((state) => state.setModalKey)

    const acceptor = role === "PRINCIPAL" ? "관리자" : "원장님"

    if (!role) return null
    return (
        <Modal isOn={modalKey === "success"} onBackdropClick={() => setModalKey(null)}>
            <Modal.Title>정보 변경을 요청했어요</Modal.Title>
            <Modal.Body>{`${acceptor}의 승인을 기다려주세요`}</Modal.Body>
            <Modal.ButtonSection>
                <Modal.Button role="confirm" onClick={() => setModalKey(null)}>
                    확인
                </Modal.Button>
            </Modal.ButtonSection>
        </Modal>
    )
}

export default ProfileModalSuccess
