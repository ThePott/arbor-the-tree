import { motion } from "motion/react"
import type { ReactNode } from "react"

export type ModalBackdropProps = {
    additionalZIndex?: number
    onBackdropClick: () => void
    children: ReactNode
}

const ModalBackdrop = ({ additionalZIndex, onBackdropClick, children }: ModalBackdropProps) => {
    const zIndex: number = 1000 + (additionalZIndex ?? 0)

    return (
        <motion.div
            initial={{ opacity: 0, backdropFilter: `blur(0px)` }}
            animate={{ opacity: 1, backdropFilter: `blur(4px)` }}
            exit={{ opacity: 0, backdropFilter: `blur(0px)` }}
            style={{ zIndex }}
            className="bg-fg-vivid/5 fixed top-0 left-0 flex h-screen w-screen items-center justify-center"
            onClick={onBackdropClick}
        >
            {children}
        </motion.div>
    )
}

export default ModalBackdrop
