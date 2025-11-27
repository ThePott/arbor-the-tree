import type { DivProps, None, XsToXl } from "@/shared/interfaces"
import { gapToCn } from "@/shared/utils/styles"
import { cva } from "class-variance-authority"
import clsx from "clsx"

const hstackVariants = cva("flex", {
    variants: {
        gap: gapToCn,
    },
})

interface WithHstackProps {
    gap?: XsToXl | None
}

export const Hstack = ({ gap = "md", ...props }: DivProps & WithHstackProps) => {
    const { className, children, ...rest } = props

    return (
        <div {...rest} className={clsx(hstackVariants({ gap }), className)}>
            {children}
        </div>
    )
}
