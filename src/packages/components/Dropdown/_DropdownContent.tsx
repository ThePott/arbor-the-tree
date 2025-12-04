import { useCallback, useEffect, useRef, type ReactNode } from "react"
import useDropdownContext from "./_useDropdownContext"
import { cva } from "class-variance-authority"
import { widthToCn } from "@/shared/utils/styles"
import clsx from "clsx"

const dropdownVariants = cva("absolute z-10 top-full right-0 mt-my-sm", {
    variants: {
        width: widthToCn,
    },
})

const DropdownContent = ({ children }: { children: ReactNode }) => {
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

    if (!isOn) {
        return null
    }

    return (
        <div ref={contentRef} className={clsx(dropdownVariants({ width }))}>
            {children}
        </div>
    )
}

export default DropdownContent
