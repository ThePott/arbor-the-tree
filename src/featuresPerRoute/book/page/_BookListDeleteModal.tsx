import Modal from "@/packages/Modal"
import useBookListStore from "./_bookListStore"
import useBookListMutation from "./_useBookListMutation"

const BookListDeleteModal = () => {
    const modalKey = useBookListStore((state) => state.modalKey)
    const selectedBook = useBookListStore((state) => state.selectedBook)
    const setModalKey = useBookListStore((state) => state.setModalKey)

    const { deleteMutation } = useBookListMutation()

    const isOn: boolean = modalKey === "delete" && Boolean(selectedBook)

    const handleBackdropClick = () => {
        if (deleteMutation.isPending) return
        setModalKey(null)
    }

    return (
        <Modal isOn={isOn} onBackdropClick={handleBackdropClick}>
            <Modal.Title>{`"${selectedBook?.title}"을 삭제할까요?`}</Modal.Title>
            <Modal.Body>이 작업은 돌이킬 수 없어요</Modal.Body>
            <Modal.ButtonSection>
                <Modal.Button role="cancel" onClick={() => setModalKey(null)} isPending={deleteMutation.isPending}>
                    취소
                </Modal.Button>
                <Modal.Button
                    role="destruct"
                    onClick={() => deleteMutation.mutate({ id: selectedBook?.id ?? "-1" })}
                    isPending={deleteMutation.isPending}
                >
                    삭제
                </Modal.Button>
            </Modal.ButtonSection>
        </Modal>
    )
}

export default BookListDeleteModal
