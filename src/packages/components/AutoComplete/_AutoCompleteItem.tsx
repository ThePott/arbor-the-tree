import Button from "../Button/Button"
import { useAutoCompleteStore } from "./_autoCompleteHooks"

const AutoCompleteOption = ({ children }: { children: string }) => {
    const setSelectedOption = useAutoCompleteStore((state) => state.setSelectedOption)
    const setIsContentOn = useAutoCompleteStore((state) => state.setIsContentOn)

    const handleClick = () => {
        setIsContentOn(false)
        setSelectedOption(children)
    }

    return (
        <Button color="black" isBorderedOnHover onClick={handleClick}>
            {children}
        </Button>
    )
}

export default AutoCompleteOption
