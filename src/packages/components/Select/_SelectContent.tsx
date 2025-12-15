import { useCallback, useEffect, useRef, type ReactNode } from "react"
import useSelectContext from "./_useSelectContext"
import { Vstack } from "../layouts"
import RoundBox from "../RoundBox"
import DropAnimation from "../motions/DropAnimation"

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
    }, [isOpened])

    return (
        <DropAnimation isOn={isOpened} intensity="sm">
            <RoundBox
                ref={contentRef}
                padding="md"
                className="mt-my-sm absolute top-full z-10 w-full"
                color="bg3"
                isBordered
                isShadowed
            >
                <Vstack gap="sm">{children}</Vstack>
            </RoundBox>
        </DropAnimation>
    )
}

export default SelectContent
