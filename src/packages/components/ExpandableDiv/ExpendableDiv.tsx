import clsx from "clsx"
import { AnimatePresence, cubicBezier, motion, type Transition } from "motion/react"
import { memo, type ReactNode } from "react"
import useMeasure from "react-use-measure"

type Animation = "drop" | "center"

interface ExpandableDiv {
    animation?: Animation
    isDramatic?: boolean
    className?: string
    children: ReactNode
    isInBound?: boolean
}

const makeAnimation = (animation: Animation, isDramatic: boolean) => {
    const multiplier = isDramatic ? 8 : 1

    const duration = 0.2 * multiplier
    const blurRadiusInPixel = 16 * multiplier
    const transformYInPixel = animation === "drop" ? -16 * multiplier : 0
    const transition: Transition = { duration, ease: cubicBezier(0.07, 1.03, 0, 0.96) }

    const variants = {
        hidden: { filter: `blur(${blurRadiusInPixel}px)`, transform: `translateY(${transformYInPixel}px)`, opacity: 0 },
        visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
    }

    return { transition, variants }
}

const makeTopStyle = (isInBound: boolean, y: number, height: number): undefined | Record<string, string> => {
    if (!isInBound) return undefined

    const diff = window.innerHeight - y - height

    if (diff > 0) return

    const style = { top: `calc(100% + ${diff}px - var(--spacing-my-xl))` }
    return style
}

const ExpandableDiv = memo(
    ({ animation = "drop", isDramatic = false, isInBound = false, className, children }: ExpandableDiv) => {
        const [ref, { y, height }] = useMeasure()

        const { transition, variants } = makeAnimation(animation, isDramatic)

        const style = makeTopStyle(isInBound, y, height)

        return (
            <motion.div animate={{ height }} style={style} className={clsx(className)}>
                <AnimatePresence mode="popLayout">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={variants}
                        transition={transition}
                        key={children?.toString()}
                    >
                        <div ref={ref}>{children}</div>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        )
    }
)

export default ExpandableDiv
