import { flip, offset, shift, useFloating } from "@floating-ui/react"
import { getRegExp } from "korean-regexp"
import { useEffect } from "react"
import Input from "../Input/Input"
import LocalAutoCompleteContent from "./LocalAutoCompleteContent"
import { LocalAutoCompleteStoreProvider, type LocalAutoCompleteExternalValues } from "./LocalAutoCompleteStoreProvider"
import useLocalAutoCompleteStore from "./useLocalAutoCompleteStore"

const LocalAutoCompleteWrapper = () => {
    const inputValue = useLocalAutoCompleteStore((state) => state.inputValue)
    const setInputValue = useLocalAutoCompleteStore((state) => state.setInputValue)
    const inputRef = useLocalAutoCompleteStore((state) => state.inputRef)
    const setIsContentOn = useLocalAutoCompleteStore((state) => state.setIsContentOn)
    const placeholder = useLocalAutoCompleteStore((state) => state.placeholder)
    const optionArray = useLocalAutoCompleteStore((state) => state.optionArray)
    const setFloatingReturns = useLocalAutoCompleteStore((state) => state.setFloatingReturns)

    const floatingReturns = useFloating({
        middleware: [flip(), shift(), offset(4)],
        placement: "bottom-start",
    })

    useEffect(() => {
        setFloatingReturns(floatingReturns)
    }, [floatingReturns])

    const refCallback = (node: HTMLInputElement | null) => {
        inputRef.current = node
        floatingReturns.refs.setReference(node)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") {
            inputRef.current?.blur()
        }

        if (event.key !== "Enter") return

        const filteredOptionArray = optionArray.filter(({ label }) => label.match(getRegExp(inputValue)))
        if (filteredOptionArray.length === 0) return

        setInputValue(filteredOptionArray[0].label)
        inputRef.current?.blur()
        inputRef.current?.closest("form")?.requestSubmit()
    }
    return (
        <div className="relative grow">
            <Input
                ref={refCallback}
                value={inputValue}
                onChange={handleChange}
                onFocus={() => setIsContentOn(true)}
                onBlur={() => setIsContentOn(false)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
            />
            <LocalAutoCompleteContent />
        </div>
    )
}

const LocalAutoComplete = (externalValues: LocalAutoCompleteExternalValues) => {
    return (
        <LocalAutoCompleteStoreProvider {...externalValues} key={JSON.stringify(externalValues)}>
            <LocalAutoCompleteWrapper />
        </LocalAutoCompleteStoreProvider>
    )
}

export default LocalAutoComplete
