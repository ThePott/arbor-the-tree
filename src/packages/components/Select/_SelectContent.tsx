import { useCallback, useEffect, useRef, type ReactNode } from "react"
import useSelectContext from "./_useSelectContext"
import { Vstack } from "../layouts"
import RoundBox from "../RoundBox"
import ExpandableDiv from "../ExpandableDiv/ExpendableDiv"
import clsx from "clsx"

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
        <ExpandableDiv className={clsx("mt-my-sm absolute top-full z-10 w-full", !isOpened && "pointer-events-none")}>
            {isOpened && (
                <RoundBox ref={contentRef} padding="md" color="bg3" isBordered isShadowed>
                    <Vstack gap="sm">{children}</Vstack>
                </RoundBox>
            )}
        </ExpandableDiv>
    )
}

export default SelectContent
