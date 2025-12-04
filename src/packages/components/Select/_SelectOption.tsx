import useSelectContext from "./_useSelectContext"
import Button from "../Button/Button"

const SelectOption = ({ value, children }: { value: string | number; children: string }) => {
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
        <Button color="black" onClick={handleClick} isShadowed={false} isBorderedOnHover>
            {children}
        </Button>
    )
}

export default SelectOption
