import Modal from "@/packages/Modal"
import useSimpleMutation from "@/shared/hooks/useSimpleMutation"
import { DESTRUCTIVE_MODAL_BODY, makeDestructiveModalTitle } from "@/shared/utils/modal-text-helper"
import { getRouteApi } from "@tanstack/react-router"
import useProgressStore from "../../store"
import type { AssignedJoinedSyllabus } from "../../types"

const route = getRouteApi("/progress/")

const ProgressSyllabusDeleteWarningModal = () => {
    const modalKey = useProgressStore((state) => state.modalKey)
    const setModalKey = useProgressStore((state) => state.setModalKey)
    const selectedSyllabus = useProgressStore((state) => state.selectedSyllabus)
    const setSelectedSyllabus = useProgressStore((state) => state.setSelectedSyllabus)

    const searchParams = route.useSearch()

    const params = {
        student_id: selectedSyllabus?.student_id,
        classroom_id: selectedSyllabus?.classroom_id,
    }

    const deleteMutation = useSimpleMutation({
        method: "delete",
        url: `/progress/syllabus/assigned/${selectedSyllabus?.syllabus.id}`,
        params,
        queryKeyWithoutParams: ["progressSyllabusAssigned"],
        additionalInvalidatingQueryKeyArray: [["progressSession", searchParams]],
        update: ({ previous }: { previous: AssignedJoinedSyllabus[] }) =>
            previous.filter((el) => el.syllabus.id !== selectedSyllabus?.syllabus.id),
    })

    const dismiss = () => {
        setSelectedSyllabus(null)
        setModalKey(null)
    }
    const handleCancel = dismiss
    const handleDestruct = () => {
        deleteMutation.mutate({ body: undefined, additionalData: undefined })
        dismiss()
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
