import { createContext, useContext } from "react"

interface SelectContextProps {
    onOptionSelect: (option: string | number) => void
    isOpened: boolean
    setIsOpened: React.Dispatch<React.SetStateAction<boolean>>
    selectedLabel: string | null
    setSelectedLabel: React.Dispatch<React.SetStateAction<string | null>>
    selectedValue: string | number | null
    setSelectedValue: React.Dispatch<React.SetStateAction<string | number | null>>
    triggerRef: React.RefObject<HTMLButtonElement | null>
    isInDanger?: boolean
    defaultLabel?: string
}

export const SelectContext = createContext<SelectContextProps | null>(null)

const useSelectContext = () => {
    const context = useContext(SelectContext)
    if (!context) {
        throw Error("---- 콘텍스트가 없어요!")
    }
    return context
}

export default useSelectContext
