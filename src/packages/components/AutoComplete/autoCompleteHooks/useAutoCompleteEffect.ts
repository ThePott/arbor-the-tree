import { useEffect } from "react"
import { useAutoCompleteStore } from "../_autoCompleteHooks"

const useAutoCompleteEffect = () => {
    const inputValue = useAutoCompleteStore((state) => state.inputValue)
    const isRed = useAutoCompleteStore((state) => state.isRed)
    const setIsRed = useAutoCompleteStore((state) => state.setIsRed)
    const optionArray = useAutoCompleteStore((state) => state.optionArray)
    const available = useAutoCompleteStore((state) => state.available)
    const onErrorChange = useAutoCompleteStore((state) => state.onErrorChange)

    useEffect(() => {
        if (!inputValue) {
            return
        }

        const isIncluded = optionArray.includes(inputValue)

        switch (available) {
            case "onlyNew":
                setIsRed(isIncluded)
                break
            case "onlyExisting":
                setIsRed(!isIncluded)
                break
            case "any":
                break
        }
    }, [inputValue, optionArray])

    useEffect(() => {
        onErrorChange(isRed)
    }, [isRed])
}

export default useAutoCompleteEffect
