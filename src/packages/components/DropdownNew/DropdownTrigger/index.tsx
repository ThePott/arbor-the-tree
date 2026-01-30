import type { ReactNode } from "react"
import useDropdownStore from "../useDropdownStore"

type DropdownTriggerProps = {
    children: ReactNode
}
const DropdownTrigger = ({ children }: DropdownTriggerProps) => {
    const triggerRef = useDropdownStore((state) => state.triggerRef)
    const setIsOn = useDropdownStore((state) => state.setIsOn)
    const isOn = useDropdownStore((state) => state.isOn)
    const setReference = useDropdownStore((state) => state.setReference)

    return (
        <div
            ref={(node) => {
                setReference(node)
                triggerRef.current = node
            }}
            onClick={() => setIsOn(!isOn)}
        >
            {children}
        </div>
    )
}

export default DropdownTrigger
