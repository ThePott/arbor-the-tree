import useDetectOutsideClick from "@/packages/utils/useDetectOutsideClick"
import { type ReactNode } from "react"
import useDropdownStore from "../useDropdownStore"

type DropdownContentProps = {
    children: ReactNode
}
const DropdownContent = ({ children }: DropdownContentProps) => {
    const triggerRef = useDropdownStore((state) => state.triggerRef)
    const isOn = useDropdownStore((state) => state.isOn)
    const setIsOn = useDropdownStore((state) => state.setIsOn)
    const setFloating = useDropdownStore((state) => state.setFloating)
    const floatingStyles = useDropdownStore((state) => state.floatingStyles)

    const { contentRef } = useDetectOutsideClick({ triggerRef, isOn, onOutsideClick: () => setIsOn(false) })

    if (!isOn) return null
    return (
        <div
            style={floatingStyles}
            ref={(node) => {
                setFloating(node)
                contentRef.current = node
            }}
        >
            {children}
        </div>
    )
}
export default DropdownContent
