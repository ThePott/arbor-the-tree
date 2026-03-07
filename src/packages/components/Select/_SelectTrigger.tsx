import { useEffect } from "react"
import Button from "../Button/Button"
import { useSelectStore } from "./_selectStore"

interface SelectTriggerProps {
    children: string
}

const SelectTrigger = ({ children }: SelectTriggerProps) => {
    const toggleIsOpened = useSelectStore((state) => state.toggleIsOpened)
    const selectedLabel = useSelectStore((state) => state.selectedLabel)
    const triggerRef = useSelectStore((state) => state.triggerRef)
    const isInDanger = useSelectStore((state) => state.isInDanger)
    const defaultOption = useSelectStore((state) => state.defaultOption)
    const disabled = useSelectStore((state) => state.disabled)
    const onOptionSelect = useSelectStore((state) => state.onOptionSelect)

    const handleClick = () => {
        if (disabled) return
        toggleIsOpened()
    }

    const label = selectedLabel ?? defaultOption?.label ?? children

    useEffect(() => {
        if (!defaultOption) return
        if (selectedLabel) return

        onOptionSelect(defaultOption.value)
    }, [defaultOption])

    return (
        <Button
            ref={triggerRef}
            disabled={disabled}
            type="button"
            onClick={handleClick}
            color={isInDanger ? "red" : "transparent"}
            padding="wide"
            className="border-border-dim hover:border-border-muted border"
        >
            {label}
        </Button>
    )
}

export default SelectTrigger
