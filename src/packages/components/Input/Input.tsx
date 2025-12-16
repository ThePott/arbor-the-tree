import type { InputProps } from "@/shared/interfaces"
import { Hstack } from "../layouts"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import type { JSX } from "react"

const inputVariants = cva(
    "bg-bg-2 px-3 py-2 rounded-my-sm  outline outline-transparent my-transition shadow-inward-my-sm items-center",
    {
        variants: {
            isRed: {
                false: "focus-within:outline-border-muted",
                true: "focus-within:outline-washed-red",
            },
            isGreen: {
                false: "focus-within:outline-border-muted",
                true: "focus-within:outline-washed-green",
            },
        },
    }
)

interface WithInputProps {
    isRed?: boolean
    isGreen?: boolean
    trailingIcon?: JSX.Element
}

const Input = ({ isRed = false, isGreen = false, trailingIcon, ...props }: InputProps & WithInputProps) => {
    const { className, ...rest } = props

    return (
        <Hstack className={clsx(inputVariants({ isRed, isGreen }), className)}>
            <input {...rest} className="w-full border-0 outline-0" />
            {trailingIcon && trailingIcon}
        </Hstack>
    )
}

export default Input
