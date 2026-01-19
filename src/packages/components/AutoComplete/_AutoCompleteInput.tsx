import useDebounce from "@/packages/utils/useDebounce"
import { useLayoutEffect } from "react"
import Input from "../Input/Input"
import Loader from "../Loader/Loader"
import { useAutoCompleteQuery, useAutoCompleteStore } from "./_autoCompleteHooks"
import useAutoCompleteEffect from "./autoCompleteHooks/useAutoCompleteEffect"
import useAutoCompleteEventHandler from "./autoCompleteHooks/useAutoCompleteEventHandlers"

const AutoCompleteInput = ({ outerIsRed }: { outerIsRed: boolean }) => {
    const setIsContentOn = useAutoCompleteStore((state) => state.setIsContentOn)
    const inputValue = useAutoCompleteStore((state) => state.inputValue)
    const setInputValue = useAutoCompleteStore((state) => state.setInputValue)
    const inputRef = useAutoCompleteStore((state) => state.inputRef)
    const isContentOn = useAutoCompleteStore((state) => state.isContentOn)
    const isRed = useAutoCompleteStore((state) => state.isRed)
    const defaultValue = useAutoCompleteStore((state) => state.defaultValue)
    const varaint = useAutoCompleteStore((state) => state.variant)
    const colorChangeIn = useAutoCompleteStore((state) => state.colorChangeIn)

    const { debouncedValue, cancel } = useDebounce(inputValue, 500)

    const { isFetching } = useAutoCompleteQuery(debouncedValue)
    const { handleBlur, handleKeyDown, handleChange } = useAutoCompleteEventHandler({ cancel })
    useAutoCompleteEffect({ outerIsRed })

    useLayoutEffect(() => {
        if (!defaultValue) {
            return
        }
        setInputValue(defaultValue)
    }, [defaultValue])

    return (
        <Input
            ref={inputRef}
            onFocus={() => setIsContentOn(true)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            value={inputValue}
            trailingIcon={isFetching && isContentOn ? <Loader /> : undefined}
            isRed={isRed}
            variant={varaint ?? "contained"}
            colorChangeIn={colorChangeIn ?? "line"}
        />
    )
}

export default AutoCompleteInput
