import type { InputProps } from "@/shared/interfaces"
import { Hstack } from "../layouts"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import type { JSX } from "react"

const inputVariants = cva("px-3 py-2 rounded-my-sm my-transition items-center outline", {
    variants: {
        isRed: {
            false: "focus-within:outline-border-muted outline-transparent",
            true: "focus-within:outline-washed-red focus-within:outline-2 outline-washed-red",
        },
        variant: {
            contained: "bg-bg-2 shadow-inward-my-sm",
            ghost: "",
        },
        colorChangeIn: {
            line: "",
            fill: "rounded-none",
        },
    },
    compoundVariants: [
        {
            variant: "ghost",
            colorChangeIn: "fill",
            isRed: true,
            className: "bg-dark-red",
        },
    ],
})

interface WithInputProps {
    isRed?: boolean
    trailingIcon?: JSX.Element
    variant?: "contained" | "ghost"
    colorChangeIn?: "line" | "fill"
}

const Input = ({
    isRed = false,
    trailingIcon,
    variant = "contained",
    colorChangeIn,
    ...props
}: InputProps & WithInputProps) => {
    const { className, ...rest } = props

    return (
        <Hstack className={clsx(inputVariants({ isRed, variant, colorChangeIn }), className)}>
            <input {...rest} className="w-full border-0 outline-0" />
            {trailingIcon && trailingIcon}
        </Hstack>
    )
}

export default Input
