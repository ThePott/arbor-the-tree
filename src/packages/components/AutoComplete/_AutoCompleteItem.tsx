import Button from "../Button/Button"
import { useAutoCompleteStore } from "./_useAutoCompleteStoreContext"

const AutoCompleteOption = ({ children }: { children: string }) => {
    const setSelectedOption = useAutoCompleteStore((state) => state.setSelectedOption)
    return (
        <Button color="black" isBorderedOnHover onClick={() => setSelectedOption(children)}>
            {children}
        </Button>
    )
}

export default AutoCompleteOption
