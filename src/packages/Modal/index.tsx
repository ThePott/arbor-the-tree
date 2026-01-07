import { AnimatePresence } from "motion/react"
import ModalBackdrop, { type ModalBackdropProps } from "./_ModalBackdrop"
import ModalContent, { type ModalContentProps } from "./_ModalContent"

type ModalProps = {
    isOn: boolean
}
const Modal = ({
    isOn,
    width = "sm",
    onClickBackdrop,
    children,
}: ModalProps & ModalContentProps & ModalBackdropProps) => {
    return (
        <AnimatePresence>
            {isOn && (
                <ModalBackdrop onClickBackdrop={onClickBackdrop}>
                    <ModalContent width={width}>{children}</ModalContent>
                </ModalBackdrop>
            )}
        </AnimatePresence>
    )
}

export default Modal
