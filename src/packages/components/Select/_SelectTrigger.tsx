import useSelectContext from "./_useSelectContext"
import Button from "../Button/Button"

interface SelectTriggerProps {
    children: string
}

const SelectTrigger = ({ children }: SelectTriggerProps) => {
    const { setIsOpened, selectedLabel: selectedChildren, triggerRef, isInDanger } = useSelectContext()

    const handleClick = () => {
        setIsOpened((prev) => !prev)
    }

    const label = selectedChildren ?? children

    return (
        <Button
            ref={triggerRef}
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
