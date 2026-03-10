import useProfileStore from "@/features/profile/store"
import Modal from "@/packages/Modal"

const ProfileModalFail = () => {
    const modalKey = useProfileStore((state) => state.modalKey)
    const setModalKey = useProfileStore((state) => state.setModalKey)
    const mutationError = useProfileStore((state) => state.mutationError)

    return (
        <Modal isOn={modalKey === "fail"} onBackdropClick={() => setModalKey(null)}>
            <Modal.Title>정보 변경을 요청을 실패했어요</Modal.Title>
            <Modal.Body>{mutationError?.response?.data.message}</Modal.Body>
            <Modal.ButtonSection>
                <Modal.Button role="confirm" onClick={() => setModalKey(null)}>
                    확인
                </Modal.Button>
            </Modal.ButtonSection>
        </Modal>
    )
}

export default ProfileModalFail
