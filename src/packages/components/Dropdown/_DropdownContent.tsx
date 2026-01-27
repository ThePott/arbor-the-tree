import { widthToCn } from "@/shared/utils/styles"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import { useCallback, useEffect, useRef, type ReactNode } from "react"
import ExpandableDiv from "../ExpandableDiv/ExpendableDiv"
import type { DropdownDirection } from "./_dropdownInterfaces"
import useDropdownContext from "./_useDropdownContext"

const dropdownVariants = cva("absolute z-10 top-full mt-my-sm", {
    variants: {
        width: widthToCn,
        direction: {
            bottomLeft: "right-0",
            bottomRight: "left-0",
        },
    },
})

interface DropdownContentProps {
    children: ReactNode
    direction?: DropdownDirection
}

const DropdownContent = ({ children, direction = "bottomRight" }: DropdownContentProps) => {
    const { width, triggerRef, isOn, setIsOn } = useDropdownContext()
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
    }, [isOn])

    return (
        <ExpandableDiv className={clsx(dropdownVariants({ width, direction }))}>
            {isOn && (
                <div ref={contentRef} onClick={(event) => event.stopPropagation()}>
                    {children}
                </div>
            )}
        </ExpandableDiv>
    )
}

export default DropdownContent
