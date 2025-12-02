import { createContext } from "react"

interface DropdownContextProps {
    isOn: boolean
    setIsOn: React.Dispatch<React.SetStateAction<boolean>>
    triggerRef: React.RefObject<HTMLDivElement | null>
    selectedMenuValue: string | null
    setSelectedMenuValue: React.Dispatch<React.SetStateAction<string | null>>
}

const DropdownContext = createContext<DropdownContextProps | null>(null)

export default DropdownContext
