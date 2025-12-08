import useSelectContext from "./_useSelectContext"
import Button from "../Button/Button"

interface SelectTriggerProps {
    children: string
}

const SelectTrigger = ({ children }: SelectTriggerProps) => {
    const { setIsOpened, selectedLabel, triggerRef, isInDanger } = useSelectContext()

    const handleClick = () => {
        setIsOpened((prev) => !prev)
    }

    const label = selectedLabel ?? children

    return (
        <Button
            ref={triggerRef}
            type="button"
            onClick={handleClick}
            color={isInDanger ? "red" : "black"}
            isWide
            className="border-border-dim hover:border-border-muted border"
        >
            <p className={selectedLabel ? "" : "text-fg-muted"}>{label}</p>
        </Button>
    )
}

export default SelectTrigger
