import Input from "../Input/Input"
import Loader from "../Loader/Loader"
import useDebounce from "@/packages/utils/useDebounce"
import { useAutoCompleteStore, useAutoCompleteQuery } from "./_autoCompleteHooks"
import { useEffect } from "react"

const AutoCompleteInput = () => {
    const setIsContentOn = useAutoCompleteStore((state) => state.setIsContentOn)
    const selectedOption = useAutoCompleteStore((state) => state.selectedOption)
    const setInputValue = useAutoCompleteStore((state) => state.setInputValue)
    const inputValue = useAutoCompleteStore((state) => state.inputValue)

    const { debouncedValue, cancel } = useDebounce(inputValue, 500)

    const { isPending, error } = useAutoCompleteQuery(debouncedValue)

    useEffect(() => {
        if (!selectedOption) return
        if (selectedOption === inputValue) return

        setInputValue(selectedOption)
    }, [selectedOption])

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
            key={selectedOption}
            onFocus={() => setIsContentOn(true)}
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
