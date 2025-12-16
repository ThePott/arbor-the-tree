import { useRef, useEffect } from "react"

const useDetectOutsideClick = <T extends HTMLElement>(
    triggerRef: React.RefObject<T | null>,
    isOn: boolean,
    onOutsideClick: () => void
) => {
    const contentRef = useRef<HTMLDivElement>(null)

    const handleClick = (event: MouseEvent) => {
        if (!contentRef.current) {
            return
        }

        if (contentRef.current.contains(event.target as Node) || triggerRef.current?.contains(event.target as Node)) {
            return
        }

        onOutsideClick()
    }

    useEffect(() => {
        if (!isOn) {
            return
        }

        window.addEventListener("click", handleClick)
        return () => window.removeEventListener("click", handleClick)
    }, [isOn])

    return { contentRef }
}

export default useDetectOutsideClick
