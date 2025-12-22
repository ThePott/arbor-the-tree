import { useEffect } from "react"
import { useAutoCompleteStore } from "../_autoCompleteHooks"

const useAutoCompleteEffect = ({ outerIsRed }: { outerIsRed: boolean }) => {
    const inputValue = useAutoCompleteStore((state) => state.inputValue)
    const isRed = useAutoCompleteStore((state) => state.isRed)
    const setIsRed = useAutoCompleteStore((state) => state.setIsRed)
    const optionArray = useAutoCompleteStore((state) => state.optionArray)
    const available = useAutoCompleteStore((state) => state.available)
    const onErrorChange = useAutoCompleteStore((state) => state.onErrorChange)
    const setInputValue = useAutoCompleteStore((state) => state.setInputValue)
    const onValueChange = useAutoCompleteStore((state) => state.onValueChange)

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

    useEffect(() => {
        setIsRed(outerIsRed)
    }, [outerIsRed])

    // NOTE: option select -> setInputValue -> onValueChange trigger 해야 함
    // NOTE: 이건 event handler로는 안 됨
    useEffect(() => {
        setInputValue(inputValue)
        onValueChange(inputValue)
    }, [inputValue])
}

export default useAutoCompleteEffect
