import { useEffect, useRef, useState } from "react"

const useDebounce = <T>(value: T, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)
    const timeoutRef = useRef<number>(null)

    const cancel = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        setDebouncedValue(value)
    }

    useEffect(() => {
        timeoutRef.current = setTimeout(() => setDebouncedValue(value), delay)

        return () => {
            if (!timeoutRef.current) {
                return
            }
            clearTimeout(timeoutRef.current)
        }
    }, [value, delay])

    return { debouncedValue, cancel }
}

export default useDebounce
