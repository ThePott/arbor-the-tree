import Button from "../Button/Button"
import useSelectContext from "./_useSelectContext"

interface SelectOptionProps {
    value: string | number
    isDisabled?: boolean
    children: string
}

const SelectOption = ({ value, isDisabled = false, children }: SelectOptionProps) => {
    const {
        onOptionSelect: onSelect,
        setIsOpened,
        setSelectedValue,
        setSelectedLabel: setSelectedChildren,
    } = useSelectContext()

    const handleClick = () => {
        setIsOpened(false)
        setSelectedValue(value)
        setSelectedChildren(children)
        onSelect(value ?? children)
    }

    return (
        <Button
            color="black"
            onClick={handleClick}
            isBorderedOnHover
            type="button"
            status={isDisabled ? "disabled" : "enabled"}
        >
            {children}
        </Button>
    )
}

export default SelectOption
