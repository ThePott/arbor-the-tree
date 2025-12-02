import { useEffect, useRef } from "react"
import useSelectContext from "./_useSelectContext"

const useCloseSelectContent = () => {
    const { isOpened, setIsOpened } = useSelectContext()

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpened])

    return contentRef
}

export default useCloseSelectContent
