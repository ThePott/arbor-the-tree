import { useCallback, useEffect, useRef, type ReactNode } from "react"
import useDropdownContext from "./_useDropdownContext"
import { cva } from "class-variance-authority"
import { widthToCn } from "@/shared/utils/styles"
import clsx from "clsx"
import DropAnimation from "../motions/DropAnimation"
import { cubicBezier, motion, type Transition } from "motion/react"

// const dropdownVariants = cva("absolute z-10 top-full right-0 mt-my-sm", {
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

    const duration = 0.3
    const blurRadiusInPixel = 32
    const transformYInPixel = -60
    const transition: Transition = { duration, ease: cubicBezier(0.08, 0.34, 0.26, 1.11) }

    const variants = {
        hidden: { filter: `blur(${blurRadiusInPixel}px)`, transform: `translateY(${transformYInPixel}px)`, opacity: 0 },
        visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
    }

    return (
        <>
            {isOn && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={transition}
                    variants={variants}
                    ref={contentRef}
                    className={clsx(dropdownVariants({ width }))}
                    key="box"
                >
                    {children}
                </motion.div>
            )}
        </>
    )
}

export default DropdownContent
