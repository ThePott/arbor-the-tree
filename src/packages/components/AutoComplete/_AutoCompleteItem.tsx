import Button from "../Button/Button"
import { useAutoCompleteStore } from "./_autoCompleteHooks"

const AutoCompleteOption = ({ children }: { children: string }) => {
    const setInputValue = useAutoCompleteStore((state) => state.setInputValue)
    const setIsContentOn = useAutoCompleteStore((state) => state.setIsContentOn)

    const handleClick = () => {
        setIsContentOn(false)
        setInputValue(children)
    }

    return (
        <Button color="transparent" border="onHover" onClick={handleClick} type="button">
            {children}
        </Button>
    )
}

export default AutoCompleteOption
