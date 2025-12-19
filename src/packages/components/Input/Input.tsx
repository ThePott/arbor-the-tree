import type { InputProps } from "@/shared/interfaces"
import { Hstack } from "../layouts"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import type { JSX } from "react"

const inputVariants = cva("bg-bg-2 px-3 py-2 rounded-my-sm  outline  my-transition shadow-inward-my-sm items-center", {
    variants: {
        isRed: {
            false: "focus-within:outline-border-muted outline-transparent",
            true: "focus-within:outline-washed-red focus-within:outline-2 outline-washed-red",
        },
    },
})

interface WithInputProps {
    isRed?: boolean
    trailingIcon?: JSX.Element
}

const Input = ({ isRed = false, trailingIcon, ...props }: InputProps & WithInputProps) => {
    const { className, ...rest } = props

    return (
        <Hstack className={clsx(inputVariants({ isRed }), className)}>
            <input {...rest} className="w-full border-0 outline-0" />
            {trailingIcon && trailingIcon}
        </Hstack>
    )
}

export default Input
