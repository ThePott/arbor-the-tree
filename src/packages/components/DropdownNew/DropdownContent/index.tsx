import useDetectOutsideClick from "@/packages/utils/useDetectOutsideClick"
import { type ReactNode } from "react"
import { createPortal } from "react-dom"
import useDropdownStore from "../useDropdownStore"

type DropdownContentProps = {
    children: ReactNode
}
const DropdownContent = ({ children }: DropdownContentProps) => {
    const triggerRef = useDropdownStore((state) => state.triggerRef)
    const isOn = useDropdownStore((state) => state.isOn)
    const setIsOn = useDropdownStore((state) => state.setIsOn)
    const floatingReturns = useDropdownStore((state) => state.floatingReturns)

    const { contentRef } = useDetectOutsideClick({ triggerRef, isOn, onOutsideClick: () => setIsOn(false) })

    if (!isOn) return null

    return (
        <>
            {createPortal(
                <div
                    style={floatingReturns?.floatingStyles}
                    ref={(node) => {
                        contentRef.current = node
                        floatingReturns?.refs.setFloating(node)
                    }}
                >
                    {children}
                </div>,
                document.body
            )}
        </>
    )
}
export default DropdownContent
