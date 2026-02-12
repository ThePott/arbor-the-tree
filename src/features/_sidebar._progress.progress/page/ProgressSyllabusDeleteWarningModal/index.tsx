import Modal from "@/packages/Modal"
import useSimpleMutation from "@/shared/hooks/useSimpleMutation"
import { DESTRUCTIVE_MODAL_BODY, makeDestructiveModalTitle } from "@/shared/utils/modal-text-helper"
import { getRouteApi } from "@tanstack/react-router"
import useProgressStore from "../../store"
import type { AssignedJoinedSyllabus } from "../../types"

const route = getRouteApi("/_sidebar")

const ProgressSyllabusDeleteWarningModal = () => {
    const modalKey = useProgressStore((state) => state.modalKey)
    const setModalKey = useProgressStore((state) => state.setModalKey)
    const selectedSyllabus = useProgressStore((state) => state.selectedSyllabus)
    const setSelectedSyllabus = useProgressStore((state) => state.setSelectedSyllabus)

    const { classroom_id, student_id } = route.useSearch()

    const params = {
        student_id: selectedSyllabus?.student_id,
        classroom_id: selectedSyllabus?.classroom_id,
    }

    const deleteMutation = useSimpleMutation({
        method: "delete",
        url: `/progress/syllabus/assigned/${selectedSyllabus?.syllabus.id}`,
        params,
        queryKey: ["progressSyllabusAssigned"],
        additionalOnSetteled: (client) =>
            client.invalidateQueries({ queryKey: ["progressSession", { classroom_id, student_id }] }),
        update: ({ previous }: { previous: AssignedJoinedSyllabus[] }) =>
            previous.filter((el) => el.syllabus.id !== selectedSyllabus?.syllabus.id),
    })

    const handleCancel = () => {
        setSelectedSyllabus(null)
        setModalKey(null)
    }
    const handleDestruct = () => {
        deleteMutation.mutate({ body: undefined, additionalData: undefined })
        // NOTE: 여기서 setSelectedSyllabus(null)하면 mutate할 때 selectedSyllabus가 undefined로 나옴
        setModalKey(null)
    }

    return (
        <Modal isOn={modalKey === "deleteAssginedSyllabus"} onBackdropClick={() => setModalKey(null)}>
            <Modal.Title>{makeDestructiveModalTitle(selectedSyllabus?.syllabus.book.title ?? "")}</Modal.Title>
            <Modal.Body>{DESTRUCTIVE_MODAL_BODY}</Modal.Body>
            <Modal.ButtonSection>
                <Modal.Button role="cancel" onClick={handleCancel}>
                    취소
                </Modal.Button>
                <Modal.Button role="destruct" onClick={handleDestruct}>
                    삭제
                </Modal.Button>
            </Modal.ButtonSection>
        </Modal>
    )
}

export default ProgressSyllabusDeleteWarningModal
