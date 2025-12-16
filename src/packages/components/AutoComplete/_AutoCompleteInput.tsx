import { useEffect } from "react"
import Input from "../Input/Input"
import { useAutoCompleteStore } from "./_useAutoCompleteStoreContext"

const AutoCompleteInput = () => {
    const setIsFocused = useAutoCompleteStore((state) => state.setIsFocused)
    const selectedOption = useAutoCompleteStore((state) => state.selectedOption)
    const setInputValue = useAutoCompleteStore((state) => state.setInputValue)
    const inputValue = useAutoCompleteStore((state) => state.inputValue)
    const onChange = useAutoCompleteStore((state) => state.onChange)

    useEffect(() => {
        onChange(inputValue)
    }, [inputValue])

    return (
        <Input
            key={selectedOption}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            defaultValue={selectedOption ?? undefined}
            onChange={(event) => setInputValue(event.target.value)}
        />
    )
}

export default AutoCompleteInput
