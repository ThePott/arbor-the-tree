import type { TextareaProps } from "@/shared/interfaces"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import type { JSX } from "react"
import { Hstack } from "../layouts"

const textareaVariants = cva("rounded-my-sm outline my-transition items-center", {
    variants: {
        isRed: {
            false: "focus-within:outline-border-muted outline-transparent",
            true: "focus-within:outline-washed-red focus-within:outline-2 outline-washed-red",
        },
        variant: {
            contained: "bg-bg-2 shadow-inward-my-sm",
            ghost: "",
        },
    },
})

interface WithTextareaProps {
    isRed?: boolean
    trailingIcon?: JSX.Element
    variant?: "contained" | "ghost"
}

const Textarea = ({
    isRed = false,
    trailingIcon,
    variant = "contained",
    ...props
}: TextareaProps & WithTextareaProps) => {
    const { className, ...rest } = props

    return (
        <Hstack className={clsx(textareaVariants({ isRed, variant }), className)}>
            <textarea {...rest} className="h-full w-full resize-none border-0 px-3 py-2 outline-0" />
            {trailingIcon && trailingIcon}
        </Hstack>
    )
}

export default Textarea
