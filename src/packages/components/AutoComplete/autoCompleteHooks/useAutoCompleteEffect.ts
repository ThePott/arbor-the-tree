import { useEffect } from "react"
import { useAutoCompleteStore } from "../_autoCompleteHooks"
import { handleInputValueChange } from "./useAutoCompleteEventHandlers"

const useAutoCompleteEffect = ({ outerIsRed }: { outerIsRed: boolean }) => {
    const inputValue = useAutoCompleteStore((state) => state.inputValue)
    const isRed = useAutoCompleteStore((state) => state.isRed)
    const setIsRed = useAutoCompleteStore((state) => state.setIsRed)
    const optionArray = useAutoCompleteStore((state) => state.optionArray)
    const available = useAutoCompleteStore((state) => state.available)
    const onErrorChange = useAutoCompleteStore((state) => state.onErrorChange)
    const setInputValue = useAutoCompleteStore((state) => state.setInputValue)
    const onValueChange = useAutoCompleteStore((state) => state.onValueChange)
    const defaultValue = useAutoCompleteStore((state) => state.defaultValue)

    useEffect(() => {
        if (!inputValue) {
            return
        }

        const isIncluded = optionArray.includes(inputValue)

        switch (available) {
            case "onlyNew":
                setIsRed(isIncluded && inputValue !== defaultValue)
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
    // NOTE: option은 반드시 무슨 값이 있을 테니까 이걸로 초기화 순서 문제 해결하자
    useEffect(() => {
        if (!inputValue) return
        setInputValue(inputValue)

        handleInputValueChange({ value: inputValue, available, optionArray, defaultValue, onValueChange })
    }, [inputValue])
}

export default useAutoCompleteEffect
