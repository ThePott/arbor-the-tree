import Button from "../Button/Button"
import useSelectContext from "./_useSelectContext"

interface SelectTriggerProps {
    children: string
}

const SelectTrigger = ({ children }: SelectTriggerProps) => {
    const { setIsOpened, selectedLabel, triggerRef, isInDanger, defaultLabel } = useSelectContext()

    const handleClick = () => {
        setIsOpened((prev) => !prev)
    }

    const label = selectedLabel ?? defaultLabel ?? children

    return (
        <Button
            ref={triggerRef}
            type="button"
            onClick={handleClick}
            color={isInDanger ? "red" : "black"}
            isWide
            className="border-border-dim hover:border-border-muted border"
        >
            {label}
        </Button>
    )
}

export default SelectTrigger
