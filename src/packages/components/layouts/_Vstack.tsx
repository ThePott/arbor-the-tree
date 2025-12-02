import type { DivProps, None, XsToXl } from "@/shared/interfaces"
import { gapToCn } from "@/shared/utils/styles"
import { cva } from "class-variance-authority"
import clsx from "clsx"

const vstackVariants = cva("flex flex-col", {
    variants: {
        gap: gapToCn,
    },
})

interface WithVstackProps {
    gap?: XsToXl | None
}

export const Vstack = ({ gap = "md", ...props }: DivProps & WithVstackProps) => {
    const { className, children, ...rest } = props

    return (
        <div {...rest} className={clsx(vstackVariants({ gap }), className)}>
            {children}
        </div>
    )
}
