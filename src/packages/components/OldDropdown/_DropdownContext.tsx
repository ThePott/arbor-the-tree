import type { XsToXl } from "@/shared/interfaces"
import { createContext } from "react"

interface DropdownContextProps {
    width: XsToXl
    isOn: boolean
    setIsOn: React.Dispatch<React.SetStateAction<boolean>>
    triggerRef: React.RefObject<HTMLDivElement | null>
    selectedMenuValue: string | null
    setSelectedMenuValue: React.Dispatch<React.SetStateAction<string | null>>
}

const DropdownContext = createContext<DropdownContextProps | null>(null)

export default DropdownContext
