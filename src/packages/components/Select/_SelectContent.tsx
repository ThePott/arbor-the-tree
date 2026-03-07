import { useCallback, useEffect, useRef, type ReactNode } from "react"
import { Vstack } from "../layouts"
import RoundBox from "../RoundBox"
import { useSelectStore } from "./_selectStore"

const SelectContent = ({ children }: { children: ReactNode }) => {
    const isOpened = useSelectStore((state) => state.isOpened)
    const setIsOpened = useSelectStore((state) => state.setIsOpened)
    const triggerRef = useSelectStore((state) => state.triggerRef)
    const floatingReturns = useSelectStore((state) => state.floatingReturns)

    const contentRef = useRef<HTMLDivElement>(null)

    const refCallback = (node: HTMLDivElement | null) => {
        contentRef.current = node
        floatingReturns?.refs.setFloating(node)
    }

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
    }, [isOpened])

    if (!isOpened) return null

    return (
        <RoundBox
            ref={refCallback}
            style={floatingReturns?.floatingStyles}
            padding="md"
            color="bg3"
            isBordered
            isShadowed
            className="z-10 w-full"
        >
            <Vstack gap="sm">{children}</Vstack>
        </RoundBox>
    )
}

export default SelectContent
