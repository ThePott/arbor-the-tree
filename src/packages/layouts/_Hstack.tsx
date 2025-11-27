import type { DivProps, XsToXl } from "@/shared/interfaces"
import { cva } from "class-variance-authority"
import clsx from "clsx"

const hstackVariants = cva("flex", {
    variants: {
        gap: {
            xs: "gap-my-xs",
            sm: "gap-my-xs",
            md: "gap-my-xs",
            lg: "gap-my-xs",
            xl: "gap-my-xs",
        },
    },
})

interface WithHstackProps {
    gap?: XsToXl
}

export const Hstack = ({ gap = "md", ...props }: DivProps & WithHstackProps) => {
    const { className, children, ...rest } = props

    return (
        <div {...rest} className={clsx(hstackVariants({ gap }), className)}>
            {children}
        </div>
    )
}
