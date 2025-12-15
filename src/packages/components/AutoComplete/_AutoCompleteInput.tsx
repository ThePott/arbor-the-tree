import Input from "../Input/Input"
import { useAutoCompleteStore } from "./_useAutoCompleteStoreContext"

const AutoCompleteInput = () => {
    const setIsFocused = useAutoCompleteStore((state) => state.setIsFocused)
    const selectedOption = useAutoCompleteStore((state) => state.selectedOption)
    return (
        <Input
            key={selectedOption}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            defaultValue={selectedOption ?? undefined}
        />
    )
}

export default AutoCompleteInput
