import type { PProps, InputProps, DivProps } from "@/shared/interfaces"
import Input from "../Input/Input"
import { Hstack, Vstack } from "../layouts"
import LabeledContext from "./LabeledContext"
import useLabeledContext from "./useLabeledContext"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import { AnimatePresence, cubicBezier, motion, type Transition } from "motion/react"
import type { ReactNode } from "react"
import useMeasure from "react-use-measure"

const LabeledHeader = (props: PProps) => {
    const { className, children, ...rest } = props

    const { isRequired } = useLabeledContext()

    return (
        <Hstack gap="xs">
            <p {...rest} className={`${className} text-sm font-medium`}>
                {children}
            </p>
            {isRequired && <p className="text-washed-red">*</p>}
        </Hstack>
    )
}

const labelFooterVariants = cva("text-my-sm", {
    variants: {
        isInDanger: {
            false: "",
            true: "text-washed-red",
        },
    },
})

const LabeledFooter = ({ className, children }: { className?: string; children: ReactNode }) => {
    const { isInDanger } = useLabeledContext()

    const duration = 0.3
    const blurRadiusInPixel = 32
    const transformYInPixel = -60
    const transition: Transition = { duration, ease: cubicBezier(0.08, 0.34, 0.26, 1.11) }

    const variants = {
        hidden: { filter: `blur(${blurRadiusInPixel}px)`, transform: `translateY(${transformYInPixel}px)`, opacity: 0 },
        visible: { filter: "blur(0)", transform: "translateY(0)", opacity: 1 },
    }
    return (
        <AnimatePresence mode="popLayout">
            {children && (
                <motion.p
                    className={clsx(labelFooterVariants({ isInDanger }), className)}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={transition}
                    variants={variants}
                >
                    {children}
                </motion.p>
            )}
        </AnimatePresence>
    )
}

const LabeledInput = (props: InputProps) => {
    const { isInDanger } = useLabeledContext()
    return <Input {...props} isRed={isInDanger} />
}

interface WithLabelGroupProps {
    isInDanger?: boolean
    isRequired?: boolean
}

const Labeled = ({ isInDanger = false, isRequired = false, ...props }: DivProps & WithLabelGroupProps) => {
    const { children, ...rest } = props
    const [ref, { height }] = useMeasure()

    return (
        <LabeledContext.Provider value={{ isInDanger, isRequired }}>
            <Vstack {...rest} gap="none">
                <motion.div animate={{ height }}>
                    <div ref={ref}>{children}</div>
                </motion.div>
            </Vstack>
        </LabeledContext.Provider>
    )
}

Labeled.Header = LabeledHeader
Labeled.Input = LabeledInput
Labeled.Footer = LabeledFooter

export default Labeled
