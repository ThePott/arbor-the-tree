import { useAutoCompleteStore } from "../_autoCompleteHooks"

interface UseAutoCompleteEventHandlerProps {
    cancel: () => void
}

const useAutoCompleteEventHandler = ({ cancel }: UseAutoCompleteEventHandlerProps) => {
    const setInputValue = useAutoCompleteStore((state) => state.setInputValue)
    const onValueChange = useAutoCompleteStore((state) => state.onValueChange)

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
        onValueChange(value)
    }

    return { handleBlur, handleKeyDown, handleChange }
}

export default useAutoCompleteEventHandler
