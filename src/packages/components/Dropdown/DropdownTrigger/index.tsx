import type { ReactNode } from "react"
import useDropdownStore from "../useDropdownStore"

type DropdownTriggerProps = {
    children: ReactNode
}
const DropdownTrigger = ({ children }: DropdownTriggerProps) => {
    const triggerRef = useDropdownStore((state) => state.triggerRef)
    const setIsOn = useDropdownStore((state) => state.setIsOn)

    return (
        <div ref={triggerRef} onClick={() => setIsOn(true)}>
            {children}
        </div>
    )
}

export default DropdownTrigger
