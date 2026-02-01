import { useCallback, useEffect, useState } from "react"
import { DEFAULT_DELAY } from "./useDebounce"

type UseDebouncingToggleProps = {
    value: boolean
    delay?: number
}
export const useDebouncingToggle = ({ value, delay = DEFAULT_DELAY }: UseDebouncingToggleProps) => {
    const [realTimeValue, setRealTimeValue] = useState(value) // NOTE: use for ui
    const [debouncedBoolValue, setDebouncedBoolValue] = useState(value) // NOTE: use for request

    useEffect(() => {
        // NOTE: update real time value for ui, when passed value from parent has been changed
        setRealTimeValue(value)
    }, [value])

    useEffect(() => {
        // NOTE: debounce
        const timeout = setTimeout(() => setDebouncedBoolValue(realTimeValue), delay)
        return () => clearTimeout(timeout)
    }, [realTimeValue])

    const toggle = useCallback(() => {
        setRealTimeValue((prev) => !prev)
    }, [])

    return { debouncedBoolValue, realTimeValue, toggle }
}
