import type { DivProps } from "@/shared/interfaces"
import { widthToCn } from "@/shared/utils/styles"
import { cva } from "class-variance-authority"
import clsx from "clsx"

const containerVariants = cva("mx-auto", {
    variants: {
        width: widthToCn,
        isPadded: {
            true: "p-my-xl",
            false: "",
        },
    },
})

interface WithContainerProps {
    width?: "sm" | "md" | "lg" | "xl"
    isPadded?: boolean
}

export const Container = ({ width = "lg", isPadded = false, ...props }: DivProps & WithContainerProps) => {
    const { className, children, ...rest } = props

    return (
        <div {...rest} className={clsx(containerVariants({ width, isPadded }), className)}>
            {children}
        </div>
    )
}
