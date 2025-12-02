import { useCallback, useEffect, useRef, type ReactNode } from "react"
import useSelectContext from "./_useSelectContext"
import { Vstack } from "../layouts"
import RoundBox from "../RoundBox"

const SelectContent = ({ children }: { children: ReactNode }) => {
    const { isOpened, setIsOpened, triggerRef } = useSelectContext()

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

            setIsOpened(false)
        },
        [setIsOpened, triggerRef]
    )

    useEffect(() => {
        if (!isOpened) {
            return
        }

        window.addEventListener("click", handleClick)
        return () => window.removeEventListener("click", handleClick)
    }, [isOpened, handleClick])

    if (!isOpened) {
        return null
    }

    return (
        <RoundBox ref={contentRef} padding="xs" className="absolute top-full z-10 w-full">
            <Vstack gap="none">{children}</Vstack>
        </RoundBox>
    )
}

export default SelectContent
