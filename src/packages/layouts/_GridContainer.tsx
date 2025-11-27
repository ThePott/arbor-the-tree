import type { DivProps, None, XsToXl } from "@/shared/interfaces"
import { gapToCn } from "@/shared/utils/styles"
import { cva } from "class-variance-authority"
import clsx from "clsx"

const gridContainerVariants = cva("grid", {
    variants: {
        gap: gapToCn,
        isAutoFill: {
            true: "",
            false: "",
        },
        minColWidth: {
            xs: "",
            sm: "",
            md: "",
            lg: "",
            xl: "",
        },
    },
    compoundVariants: [
        { isAutoFill: true, minColWidth: "xs", className: "grid-cols-[repeat(auto-fill,minmax(60px,1fr))]" },
        { isAutoFill: true, minColWidth: "sm", className: "grid-cols-[repeat(auto-fill,minmax(120px,1fr))]" },
        { isAutoFill: true, minColWidth: "md", className: "grid-cols-[repeat(auto-fill,minmax(240px,1fr))]" },
        { isAutoFill: true, minColWidth: "lg", className: "grid-cols-[repeat(auto-fill,minmax(480px,1fr))]" },
        { isAutoFill: true, minColWidth: "xl", className: "grid-cols-[repeat(auto-fill,minmax(960px,1fr))]" },
    ],
})

interface WithGridContainerProps {
    gap?: XsToXl | None
    isAutoFill?: boolean
    minColWidth?: XsToXl
}

export const GridContainer = ({
    gap = "md",
    isAutoFill = true,
    minColWidth = "md",
    ...props
}: DivProps & WithGridContainerProps) => {
    const { className, children, ...rest } = props

    return (
        <div {...rest} className={clsx(gridContainerVariants({ gap, isAutoFill, minColWidth }), className)}>
            {children}
        </div>
    )
}
