import useDetectOutsideClick from "@/packages/utils/useDetectOutsideClick"
import { narrowWidthToCn } from "@/shared/utils/styles"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import { type ReactNode } from "react"
import ExpandableDiv from "../../ExpandableDiv/ExpendableDiv"
import useDropdownStore from "../useDropdownStore"

const dropdownVariants = cva("absolute z-100 top-full mt-my-xs", {
    variants: {
        width: narrowWidthToCn,
        direction: {
            left: "right-0",
            right: "left-0",
        },
    },
})

type DropdownContentProps = {
    children: ReactNode
}
const DropdownContent = ({ children }: DropdownContentProps) => {
    const width = useDropdownStore((state) => state.width)
    const triggerRef = useDropdownStore((state) => state.triggerRef)
    const isOn = useDropdownStore((state) => state.isOn)
    const setIsOn = useDropdownStore((state) => state.setIsOn)
    const direction = useDropdownStore((state) => state.direction)

    const { contentRef } = useDetectOutsideClick({ triggerRef, isOn, onOutsideClick: () => setIsOn(false) })

    return (
        <ExpandableDiv className={clsx(dropdownVariants({ direction, width }))}>
            {isOn && <div ref={contentRef}>{children}</div>}
        </ExpandableDiv>
    )
}

export default DropdownContent
