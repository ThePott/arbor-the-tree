import type { DivProps } from "@/shared/interfaces"
import { cva } from "class-variance-authority"
import clsx from "clsx"

const flexOneContainerVariants = cva("flex-1", {
    variants: {
        isYScrollable: {
            true: "overflow-y-scroll",
            false: "overflow-y-hidden",
        },
        isXScrollable: {
            true: "overflow-x-scroll",
            false: "overflow-x-hidden",
        },
    },
})

interface WithFlexOneContainer {
    isYScrollable?: boolean
    isXScrollable?: boolean
}

export const FlexOneContainer = ({
    isYScrollable = false,
    isXScrollable = false,
    ...props
}: DivProps & WithFlexOneContainer) => {
    const { className, children, ...rest } = props

    return (
        <div {...rest} className={clsx(flexOneContainerVariants({ isYScrollable, isXScrollable }), className)}>
            {children}
        </div>
    )
}
