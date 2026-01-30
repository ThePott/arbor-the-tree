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

    const { contentRef } = useDetectOutsideClick({ triggerRef, isOn, onOutsideClick: () => setIsOn(false) })

    return <>{isOn && <div ref={contentRef}>{children}</div>}</>
}

export default DropdownContent
