import Input from "../Input/Input"
import Loader from "../Loader/Loader"
import useDebounce from "@/packages/utils/useDebounce"
import { useAutoCompleteStore, useAutoCompleteQuery } from "./_autoCompleteHooks"

const AutoCompleteInput = () => {
    const setIsFocused = useAutoCompleteStore((state) => state.setIsFocused)
    const selectedOption = useAutoCompleteStore((state) => state.selectedOption)
    const setInputValue = useAutoCompleteStore((state) => state.setInputValue)
    const inputValue = useAutoCompleteStore((state) => state.inputValue)

    const { debouncedValue, cancel } = useDebounce(inputValue, 500)

    const { isPending, error } = useAutoCompleteQuery(debouncedValue)

    const handleBlur = () => {
        setIsFocused(false)
        cancel()
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") {
            return
        }
        cancel()
    }

    return (
        <Input
            key={selectedOption}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            defaultValue={selectedOption ?? undefined}
            onChange={(event) => setInputValue(event.target.value)}
            trailingIcon={isPending ? <Loader /> : undefined}
            isRed={Boolean(error)}
        />
    )
}

export default AutoCompleteInput
