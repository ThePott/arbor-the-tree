import type { AutoCompleteAvailable } from "../_AutoCompleteContextProvider"
import { useAutoCompleteStore } from "../_autoCompleteHooks"

interface UseAutoCompleteEventHandlerProps {
    cancel: () => void
}

interface HandleInputValueChangeProps {
    value: string
    optionArray: string[]
    available: AutoCompleteAvailable
    defaultValue: string | undefined
    onValueChange: (value: string, isError: boolean) => void
}

export const handleInputValueChange = ({
    value,
    optionArray,
    available,
    defaultValue,
    onValueChange,
}: HandleInputValueChangeProps) => {
    const isIncluded = optionArray.includes(value)

    let isError: boolean
    switch (available) {
        case "onlyNew":
            isError = isIncluded && value !== defaultValue
            break
        case "onlyExisting":
            isError = !isIncluded
            break
        case "any":
            isError = false
            break
    }
    onValueChange(value, isError)
}

const useAutoCompleteEventHandler = ({ cancel }: UseAutoCompleteEventHandlerProps) => {
    const setInputValue = useAutoCompleteStore((state) => state.setInputValue)
    const onValueChange = useAutoCompleteStore((state) => state.onValueChange)
    const optionArray = useAutoCompleteStore((state) => state.optionArray)
    const available = useAutoCompleteStore((state) => state.available)
    const defaultValue = useAutoCompleteStore((state) => state.defaultValue)

    const handleBlur = () => {
        cancel()
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") {
            return
        }
        cancel()
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setInputValue(value)

        handleInputValueChange({ value, optionArray, defaultValue, available, onValueChange })
    }

    return { handleBlur, handleKeyDown, handleChange }
}

export default useAutoCompleteEventHandler
