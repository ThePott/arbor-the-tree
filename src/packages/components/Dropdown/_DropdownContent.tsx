import { useCallback, useEffect, useRef, type ReactNode } from "react"
import useDropdownContext from "./_useDropdownContext"

const DropdownContent = ({ children }: { children: ReactNode }) => {
    const { triggerRef, isOn, setIsOn } = useDropdownContext()
    const contentRef = useRef<HTMLDivElement>(null)

    const handleClick = useCallback(
        (event: MouseEvent) => {
            if (!contentRef.current) {
                return
            }

            if (
                contentRef.current.contains(event.target as Node) ||
                triggerRef.current?.contains(event.target as Node)
            ) {
                return
            }

            setIsOn(false)
        },
        [setIsOn, triggerRef]
    )

    useEffect(() => {
        if (!isOn) {
            return
        }

        window.addEventListener("click", handleClick)
        return () => window.removeEventListener("click", handleClick)
    }, [isOn, handleClick])

    if (!isOn) {
        return null
    }

    if (!triggerRef.current) {
        return null
    }

    const style = {
        top: triggerRef.current.offsetHeight + 4,
        right: 0,
    }

    return (
        <div ref={contentRef} style={style} className="absolute z-10">
            {children}
        </div>
    )
}

export default DropdownContent
