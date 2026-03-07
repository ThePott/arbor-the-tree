import Button from "../Button/Button"
import { useSelectStore } from "./_selectStore"

interface SelectOptionProps {
    value: string | number
    isDisabled?: boolean
    children: string
}

const SelectOption = ({ value, isDisabled = false, children }: SelectOptionProps) => {
    const onOptionSelect = useSelectStore((state) => state.onOptionSelect)
    const setIsOpened = useSelectStore((state) => state.setIsOpened)
    const setSelectedValue = useSelectStore((state) => state.setSelectedValue)
    const setSelectedLabel = useSelectStore((state) => state.setSelectedLabel)

    const handleClick = () => {
        setIsOpened(false)
        setSelectedValue(value)
        setSelectedLabel(children)
        onOptionSelect(value ?? children)
    }

    return (
        <Button
            color="transparent"
            onClick={handleClick}
            border="onHover"
            type="button"
            status={isDisabled ? "disabled" : "enabled"}
        >
            {children}
        </Button>
    )
}

export default SelectOption
