import { useEffect } from "react"
import Button from "../Button/Button"
import useSelectContext from "./_useSelectContext"

interface SelectTriggerProps {
    children: string
}

const SelectTrigger = ({ children }: SelectTriggerProps) => {
    const { setIsOpened, selectedLabel, triggerRef, isInDanger, defaultOption, disabled, onOptionSelect } =
        useSelectContext()

    const handleClick = () => {
        if (disabled) return
        setIsOpened((prev) => !prev)
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
