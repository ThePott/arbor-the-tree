import { useEffect, useRef } from "react"
import { useSelectStore } from "./_selectStore"

const useCloseSelectContent = () => {
    const isOpened = useSelectStore((state) => state.isOpened)
    const setIsOpened = useSelectStore((state) => state.setIsOpened)

    const contentRef = useRef<HTMLDivElement>(null)

    const handleClick = (event: MouseEvent) => {
        if (!contentRef.current) {
            return
        }
        if (contentRef.current.contains(event.target as Node)) {
            return
        }

        setIsOpened(false)
    }

    useEffect(() => {
        if (!isOpened) {
            return
        }

        window.addEventListener("click", handleClick)
        return () => window.removeEventListener("click", handleClick)
    }, [isOpened])

    return contentRef
}

export default useCloseSelectContent
