import { CenterContainer, Container } from "../components/layouts"
import type { SmToLg } from "@/shared/interfaces"
import { AnimatePresence, motion } from "motion/react"
import type { ReactNode } from "react"

interface ModalProps {
    isOn: boolean
    additionalZIndex?: number
    onBackgroundClick: () => void
    width?: SmToLg
    children: ReactNode
}
// NOTE: 미완
// NOTE: 애니메이션이 있으면 굉장히 까다로워진다
const Modal = ({ isOn, width = "sm", onBackgroundClick, children }: ModalProps) => {
    return (
        <motion.div className="pointer-events-none absolute inset-0">
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={String(isOn)}
                    style={{ backdropFilter: `blur(${isOn ? 4 : 0}px)` }}
                    className="size-full"
                    onClick={() => {
                        debugger
                    }}
                >
                    {isOn && (
                        <CenterContainer
                            className="bg-fg-vivid/50 backdrop-blur-xs"
                            onClick={() => {
                                debugger
                                onBackgroundClick()
                            }}
                        >
                            <Container width={width} isPadded>
                                {children}
                            </Container>
                        </CenterContainer>
                    )}
                </motion.div>
            </AnimatePresence>
        </motion.div>
    )
}

export default Modal
