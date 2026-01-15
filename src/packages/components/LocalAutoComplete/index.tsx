import { getRegExp } from "korean-regexp"
import Input from "../Input/Input"
import LocalAutoCompleteContent from "./LocalAutoCompleteContent"
import { LocalAutoCompleteStoreProvider, type LocalAutoCompleteExternalValues } from "./LocalAutoCompleteStoreProvider"
import useLocalAutoCompleteStore from "./useLocalAutoCompleteStore"

const LocalAutoCompleteWrapper = () => {
    console.log("LOG: LocalAutoCompleteWrapper render")
    const inputValue = useLocalAutoCompleteStore((state) => state.inputValue)
    const setInputValue = useLocalAutoCompleteStore((state) => state.setInputValue)
    const inputRef = useLocalAutoCompleteStore((state) => state.inputRef)
    const setIsContentOn = useLocalAutoCompleteStore((state) => state.setIsContentOn)
    const placeholder = useLocalAutoCompleteStore((state) => state.placeholder)
    const optionArray = useLocalAutoCompleteStore((state) => state.optionArray)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") {
            inputRef.current?.blur()
        }

        if (event.key !== "Enter") return
        inputRef.current?.blur()

        const filteredOptionArray = optionArray.filter(({ label }) => label.match(getRegExp(inputValue)))
        if (filteredOptionArray.length === 0) return

        setInputValue(filteredOptionArray[0].label)
    }
    return (
        <div className="relative grow">
            <Input
                ref={inputRef}
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
        <LocalAutoCompleteStoreProvider {...externalValues}>
            <LocalAutoCompleteWrapper />
        </LocalAutoCompleteStoreProvider>
    )
}

export default LocalAutoComplete
