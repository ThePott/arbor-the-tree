import type { InputProps } from "@/shared/interfaces"
import { Hstack } from "../layouts"
import { cva } from "class-variance-authority"
import clsx from "clsx"

const inputVariants = cva(
    "bg-bg-2 px-3 py-2 rounded-my-sm  outline outline-transparent my-transition shadow-inward-my-sm",
    {
        variants: {
            isInDanger: {
                false: "focus-within:outline-border-muted",
                true: "focus-within:outline-washed-red",
            },
        },
    }
)

interface WithInputProps {
    isInDanger?: boolean
}

const Input = ({ isInDanger = false, ...props }: InputProps & WithInputProps) => {
    const { className, ...rest } = props

    return (
        <Hstack className={clsx(inputVariants({ isInDanger }), className)}>
            <input {...rest} className="w-full border-0 outline-0" />
        </Hstack>
    )
}

export default Input
