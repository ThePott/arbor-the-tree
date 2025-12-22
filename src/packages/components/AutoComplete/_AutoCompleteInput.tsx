import Input from "../Input/Input"
import Loader from "../Loader/Loader"
import useDebounce from "@/packages/utils/useDebounce"
import { useAutoCompleteStore, useAutoCompleteQuery } from "./_autoCompleteHooks"
import useAutoCompleteEffect from "./autoCompleteHooks/useAutoCompleteEffect"
import useAutoCompleteEventHandler from "./autoCompleteHooks/useAutoCompleteEventHandlers"
import { useEffect } from "react"

const AutoCompleteInput = ({ outerIsRed }: { outerIsRed: boolean }) => {
    const setIsContentOn = useAutoCompleteStore((state) => state.setIsContentOn)
    const inputValue = useAutoCompleteStore((state) => state.inputValue)
    const inputRef = useAutoCompleteStore((state) => state.inputRef)
    const isContentOn = useAutoCompleteStore((state) => state.isContentOn)
    const isRed = useAutoCompleteStore((state) => state.isRed)
    const setIsRed = useAutoCompleteStore((state) => state.setIsRed)

    const { debouncedValue, cancel } = useDebounce(inputValue, 500)

    const { isFetching } = useAutoCompleteQuery(debouncedValue)
    const { handleBlur, handleChange, handleKeyDown } = useAutoCompleteEventHandler({ cancel })
    useAutoCompleteEffect()

    useEffect(() => {
        setIsRed(outerIsRed)
    }, [outerIsRed])

    return (
        <Input
            ref={inputRef}
            onFocus={() => setIsContentOn(true)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            value={inputValue}
            onChange={handleChange}
            trailingIcon={isFetching && isContentOn ? <Loader /> : undefined}
            isRed={isRed}
        />
    )
}

export default AutoCompleteInput
