import { widthToCn } from "@/shared/utils/styles"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import { useCallback, useEffect, useRef, type ReactNode } from "react"
import ExpandableDiv from "../../ExpandableDiv/ExpendableDiv"
import useDropdownStore from "../useDropdownStore"

export type DropdownDirection = "bottomLeft" | "bottomRight"

const dropdownVariants = cva("absolute z-100 top-full mt-my-xs", {
    variants: {
        width: widthToCn,
        direction: {
            bottomLeft: "right-0",
            bottomRight: "left-0",
        },
    },
})

type DropdownContentProps = {
    children: ReactNode
    direction?: DropdownDirection
}
const DropdownContent = ({ children, direction = "bottomRight" }: DropdownContentProps) => {
    const width = useDropdownStore((state) => state.width)
    const triggerRef = useDropdownStore((state) => state.triggerRef)
    const isOn = useDropdownStore((state) => state.isOn)
    const setIsOn = useDropdownStore((state) => state.setIsOn)
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
            {isOn && <div ref={contentRef}>{children}</div>}
        </ExpandableDiv>
    )
}

export default DropdownContent
