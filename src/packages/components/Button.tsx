import type { ButtonProps, Color } from "@/shared/interfaces"
import { buttonColorToCn, type ButtonColor } from "@/shared/utils/styles"
import { cva } from "class-variance-authority"
import clsx from "clsx"

const buttonVariants = cva("py-my-sm px-my-md rounded-my-sm cursor-pointer transition shadow-my-sm", {
    variants: {
        color: buttonColorToCn,
        status: {
            enabled: "",
            disabled: "",
            pending: "",
        },
        isWide: {
            true: "w-full",
            false: "",
        },
    },
    compoundVariants: [
        { status: "enabled", color: "bg0", className: "hover:bg-bg-1 active:bg-bg-2" },
        { status: "enabled", color: "bg1", className: "hover:bg-bg-2 active:bg-bg-3" },
        { status: "enabled", color: "bg2", className: "hover:bg-bg-3 active:bg-washed-black" },
        { status: "enabled", color: "green", className: "hover:bg-washed-green-1 active:bg-washed-green-2" },
    ],
})

interface WithButtonProps {
    color?: Extract<Color, ButtonColor>
    status?: "enabled" | "disabled" | "pending"
    isWide?: boolean
}

const Button = ({ color = "bg1", status = "enabled", isWide, ...props }: ButtonProps & WithButtonProps) => {
    const { className, children, ...rest } = props
    return (
        <button {...rest} className={clsx(buttonVariants({ color, status, isWide }), className)}>
            {children}
        </button>
    )
}

export default Button
