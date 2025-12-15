import type { SmToLg } from "@/shared/interfaces"
import { AnimatePresence, cubicBezier, motion, type Transition } from "motion/react"
import type { ReactNode } from "react"

type Intensity = SmToLg

interface WtihDropAnimationProps {
    intensity?: Intensity
    isOn?: boolean
    children: ReactNode
}

const intensityToNumber: Record<Intensity, number> = {
    sm: 0.5,
    md: 1,
    lg: 1.5,
}

const DropAnimation = ({ isOn = true, intensity = "md", children }: WtihDropAnimationProps) => {
    const intensityInNumber = intensityToNumber[intensity]
    const duration = 0.3 * intensityInNumber
    const blurRadiusInPixel = 32 * intensityInNumber
    const transformYInPixel = -60 * intensityInNumber
    const transition: Transition = { duration, ease: cubicBezier(0.08, 0.34, 0.26, 1.11) }

    const variants = {
        hidden: { filter: `blur(${blurRadiusInPixel}px)`, transform: `translateY(${transformYInPixel}px)`, opacity: 0 },
        visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
    }
    return (
        <AnimatePresence>
            {isOn && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={transition}
                    variants={variants}
                    key="box"
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default DropAnimation
