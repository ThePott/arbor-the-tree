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

    const { contentRef } = useDetectOutsideClick({ triggerRef, isOn, onOutsideClick: () => setIsOn(false) })

    if (!isOn) return null
    return (
        <div
            ref={(node) => {
                setFloating(node)
                contentRef.current = node
            }}
            className="absolute left-0 top-0"
        >
            {children}
        </div>
    )
}
export default DropdownContent
