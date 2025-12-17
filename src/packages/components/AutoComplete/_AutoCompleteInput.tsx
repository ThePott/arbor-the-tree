import Input from "../Input/Input"
import Loader from "../Loader/Loader"
import useDebounce from "@/packages/utils/useDebounce"
import { useAutoCompleteStore, useAutoCompleteQuery } from "./_autoCompleteHooks"

const AutoCompleteInput = () => {
    const setIsContentOn = useAutoCompleteStore((state) => state.setIsContentOn)
    const setInputValue = useAutoCompleteStore((state) => state.setInputValue)
    const inputValue = useAutoCompleteStore((state) => state.inputValue)
    const inputRef = useAutoCompleteStore((state) => state.inputRef)
    const isContentOn = useAutoCompleteStore((state) => state.isContentOn)

    const { debouncedValue, cancel } = useDebounce(inputValue, 500)

    const { isFetching, error } = useAutoCompleteQuery(debouncedValue)

    const handleBlur = () => {
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
            ref={inputRef}
            onFocus={() => setIsContentOn(true)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            trailingIcon={isFetching && isContentOn ? <Loader /> : undefined}
            isRed={Boolean(error)}
        />
    )
}

export default AutoCompleteInput
