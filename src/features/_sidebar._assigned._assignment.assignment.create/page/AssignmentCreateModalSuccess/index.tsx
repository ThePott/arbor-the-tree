import Modal from "@/packages/Modal"
import { getRouteApi, useNavigate } from "@tanstack/react-router"
import useAssignmentCreateStore from "../../store"

const route = getRouteApi("/_sidebar")
const AssignmentCreateModalSuccess = () => {
    const modalKey = useAssignmentCreateStore((state) => state.modalKey)
    const setModalKey = useAssignmentCreateStore((state) => state.setModalKey)

    const searchParams = route.useSearch()
    const navigate = useNavigate({ from: "/assignment/create/" })

    return (
        <Modal isOn={modalKey === "success"} onBackdropClick={() => setModalKey(null)}>
            <Modal.Title>오답 과제를 제작했어요</Modal.Title>
            <Modal.Body>오답 과제 목록 페이지에서 만들어진 오답 과제를 확인할 수 있어요</Modal.Body>
            <Modal.ButtonSection>
                <Modal.Button role="cancel" onClick={() => setModalKey(null)}>
                    확인
                </Modal.Button>
                <Modal.Button
                    role="confirm"
                    onClick={() => {
                        setModalKey(null)
                        navigate({ to: "/assignment", search: searchParams })
                    }}
                >
                    이동
                </Modal.Button>
            </Modal.ButtonSection>
        </Modal>
    )
}

export default AssignmentCreateModalSuccess
