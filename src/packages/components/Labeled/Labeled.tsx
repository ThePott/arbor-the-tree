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
import ExpandableDiv from "../ExpandableDiv/ExpendableDiv"

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

    return (
        <ExpandableDiv>
            {children && <p className={clsx(labelFooterVariants({ isInDanger }), className)}>{children}</p>}
        </ExpandableDiv>
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

    return (
        <LabeledContext.Provider value={{ isInDanger, isRequired }}>
            <Vstack {...rest} gap="none">
                {children}
            </Vstack>
        </LabeledContext.Provider>
    )
}

Labeled.Header = LabeledHeader
Labeled.Input = LabeledInput
Labeled.Footer = LabeledFooter

export default Labeled
