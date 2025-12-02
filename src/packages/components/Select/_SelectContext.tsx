import { createContext, type JSX } from "react"

interface SelectContextProps {
    onOptionSelect: (option: string | number) => void
    isOpened: boolean
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
    selectedChildren: string | null
    setSelectedChildren: React.Dispatch<React.SetStateAction<string | null>>
    selectedValue: string | number | undefined
    setSelectedValue: React.Dispatch<React.SetStateAction<string | number | undefined>>
    selectedIcon: JSX.Element | null
    setSelectedIcon: React.Dispatch<React.SetStateAction<JSX.Element | null>>
    triggerRef: React.RefObject<HTMLDivElement | null>
    isInDanger?: boolean
}

const SelectContext = createContext<SelectContextProps | null>(null)

export default SelectContext
