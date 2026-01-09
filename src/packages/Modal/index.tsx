import { AnimatePresence } from "motion/react"
import ModalBackdrop, { type ModalBackdropProps } from "./_ModalBackdrop"
import ModalContent, { type ModalContentProps } from "./_ModalContent"
import ModalTitle from "./_ModalTitle"
import ModalBody from "./_ModalBody"
import ModalButtonSection from "./_ModalButtonSection"
import ModalButton from "./_ModalButton"

type ModalProps = {
    isOn: boolean
}
const Modal = ({
    isOn,
    width = "sm",
    onBackdropClick: onClickBackdrop,
    children,
}: ModalProps & ModalContentProps & ModalBackdropProps) => {
    return (
        <AnimatePresence>
            {isOn && (
                <ModalBackdrop onBackdropClick={onClickBackdrop}>
                    <ModalContent width={width}>{children}</ModalContent>
                </ModalBackdrop>
            )}
        </AnimatePresence>
    )
}

Modal.Title = ModalTitle
Modal.Body = ModalBody
Modal.ButtonSection = ModalButtonSection
Modal.Button = ModalButton

export default Modal
