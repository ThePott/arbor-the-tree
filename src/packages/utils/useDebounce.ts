import { useEffect, useRef, useState } from "react"

type UseDebounceProps<TValue> = {
    value: TValue
    delay: number
}
const useDebounce = <TValue>({ value, delay }: UseDebounceProps<TValue>) => {
    const [debouncedValue, setDebouncedValue] = useState<TValue>(value)
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
