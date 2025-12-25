import type { InputProps } from "@/shared/interfaces"
import { Hstack } from "../layouts"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import type { JSX } from "react"

const inputVariants = cva("px-3 py-2 rounded-my-sm my-transition items-center", {
    variants: {
        isRed: {
            false: "",
            true: "",
        },
        variant: {
            contained: "bg-bg-2 shadow-inward-my-sm",
            ghost: "",
        },
        colorChangeIn: {
            line: "outline",
            fill: "",
        },
    },
    compoundVariants: [
        { colorChangeIn: "line", isRed: false, className: "focus-within:outline-border-muted outline-transparent" },
        {
            colorChangeIn: "line",
            isRed: true,
            className: "focus-within:outline-washed-red focus-within:outline-2 outline-washed-red",
        },
        { variant: "ghost", colorChangeIn: "fill", isRed: false, className: "" },
        {
            variant: "ghost",
            colorChangeIn: "fill",
            isRed: true,
            className: "bg-dark-red rounded-none ",
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
