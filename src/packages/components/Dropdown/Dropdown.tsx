import { useRef, useState, type ReactNode } from "react"
import DropdownContext from "./_DropdownContext"
import DropdonwTrigger from "./_DropdownTrigger"
import DropdownContent from "./_DropdownContent"
import DropdownMenu from "./_DropdownMenu"
import DropdownMenuItem from "./_DropdownMenuItem"
import type { XsToXl } from "@/shared/interfaces"

interface DropdownProps {
    width?: XsToXl
    children: ReactNode
}

const Dropdown = ({ width = "xs", children }: DropdownProps) => {
    const [isOn, setIsOn] = useState(false)
    const [selectedMenuValue, setSelectedMenuValue] = useState<string | null>(null)
    const triggerRef = useRef<HTMLDivElement>(null)

    return (
        <DropdownContext.Provider
            value={{
                width,
                isOn,
                setIsOn,
                triggerRef,
                selectedMenuValue,
                setSelectedMenuValue,
            }}
        >
            <div className="relative w-fit">{children}</div>
        </DropdownContext.Provider>
    )
}

Dropdown.Trigger = DropdonwTrigger
Dropdown.Content = DropdownContent

Dropdown.Menu = DropdownMenu
Dropdown.MenuItem = DropdownMenuItem

export default Dropdown
