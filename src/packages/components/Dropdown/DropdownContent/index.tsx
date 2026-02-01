import useDetectOutsideClick from "@/packages/utils/useDetectOutsideClick"
import { narrowWidthToCn } from "@/shared/utils/styles"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import { type ReactNode } from "react"
import { createPortal } from "react-dom"
import useDropdownStore from "../useDropdownStore"

const dropdownVariants = cva("", {
    variants: {
        width: narrowWidthToCn,
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
    const floatingReturns = useDropdownStore((state) => state.floatingReturns)

    const { contentRef } = useDetectOutsideClick({ triggerRef, isOn, onOutsideClick: () => setIsOn(false) })

    const refCallback = (node: HTMLDivElement | null) => {
        contentRef.current = node
        floatingReturns?.refs.setFloating(node)
    }
    if (!isOn) return
    return createPortal(
        <div ref={refCallback} style={floatingReturns?.floatingStyles} className={clsx(dropdownVariants({ width }))}>
            {children}
        </div>,
        document.body
    )
}

export default DropdownContent
