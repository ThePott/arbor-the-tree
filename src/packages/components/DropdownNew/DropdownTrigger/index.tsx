import { flip, shift, useFloating } from "@floating-ui/react"
import { useEffect, type ReactNode } from "react"
import useDropdownStore from "../useDropdownStore"

type DropdownTriggerProps = {
    children: ReactNode
}
const DropdownTrigger = ({ children }: DropdownTriggerProps) => {
    const triggerRef = useDropdownStore((state) => state.triggerRef)
    const setIsOn = useDropdownStore((state) => state.setIsOn)
    const isOn = useDropdownStore((state) => state.isOn)
    const setFloatingReturns = useDropdownStore((state) => state.setFloatingReturns)

    const floatingReturns = useFloating({ middleware: [flip(), shift()], placement: "right" })

    useEffect(() => {
        setFloatingReturns(floatingReturns)
    }, [floatingReturns])

    return (
        <div
            ref={(node) => {
                triggerRef.current = node
                floatingReturns?.refs.setReference(node)
            }}
            onClick={() => setIsOn(!isOn)}
        >
            {children}
        </div>
    )
}

export default DropdownTrigger
