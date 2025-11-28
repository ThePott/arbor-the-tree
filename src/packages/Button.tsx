import type { ButtonProps, Color } from "@/shared/interfaces"
import { boxColorToCn } from "@/shared/utils/styles"
import { cva } from "class-variance-authority"
import clsx from "clsx"

const buttonVariants = cva("py-my-sm px-my-md rounded-my-sm", {
    variants: {
        color: boxColorToCn,
    },
})

interface WithButtonProps {
    color?: Extract<Color, "green" | "bg0" | "bg1" | "bg2">
}

const Button = ({ color = "bg1", ...props }: ButtonProps & WithButtonProps) => {
    const { className, children, ...rest } = props
    return (
        <button {...rest} className={clsx(buttonVariants({ color }), className)}>
            {children}
        </button>
    )
}

export default Button
