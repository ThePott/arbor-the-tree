import type { DivProps } from "@/shared/interfaces"
import { cva } from "class-variance-authority"
import clsx from "clsx"

// NOTE: 여기에 [scrollbar-gutter:stable]하게 되면 겹겹이 FlexOneContainer를 쓸 때 거터가 중첩됨
// NOTE: 예시: progress page
const flexOneContainerVariants = cva("flex-1", {
    variants: {
        isYScrollable: {
            true: "overflow-y-auto",
            false: "overflow-y-hidden",
        },
        isXScrollable: {
            true: "overflow-x-auto",
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
