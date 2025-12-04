import type { ButtonProps, Color } from "@/shared/interfaces"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import type { ButtonColor } from "./buttonInterfaces"
import Loader from "../Loader/Loader"
import { Hstack } from "../layouts"
import { buttonColorToCn } from "@/shared/utils/styles"

const buttonVariants = cva("py-my-sm px-my-md rounded-my-sm  transition shadow-my-sm", {
    variants: {
        color: buttonColorToCn,
        status: {
            enabled: "cursor-pointer",
            disabled: "",
            pending: "",
        },
        isWide: {
            true: "w-full",
            false: "",
        },
    },
    compoundVariants: [
        { color: ["bg0", "bg1", "bg2"], status: "enabled", className: "text-fg-vivid" },
        { color: ["bg0", "bg1", "bg2"], status: ["disabled", "pending"], className: "text-fg-muted" },
        { color: ["green", "red"], status: "enabled", className: "text-fg-inverted-vivid" },
        { color: ["green", "red"], status: ["disabled", "pending"], className: "text-fg-inverted-vivid" },

        { color: "bg0", status: "enabled", className: "hover:bg-bg-1 active:bg-bg-2" },
        { color: "bg1", status: "enabled", className: "hover:bg-bg-2 active:bg-bg-3" },
        { color: "bg2", status: "enabled", className: "hover:bg-bg-3 active:bg-washed-black" },

        { color: "green", status: "enabled", className: "hover:bg-washed-green-1 active:bg-washed-green-2" },
        { color: "green", status: "disabled", className: "bg-washed-green-neg-1" },
        { color: "green", status: "pending", className: "bg-washed-green-neg-1" },

        { color: "red", status: "enabled", className: "bg-washed-red hover:bg-washed-red-1 active:bg-washed-red-2" },
        { color: "red", status: "disabled", className: "bg-washed-red-neg-1" },
        { color: "red", status: "pending", className: "bg-washed-red-neg-1" },
    ],
})

interface WithButtonProps {
    color?: Extract<Color, ButtonColor>
    status?: "enabled" | "disabled" | "pending"
    isWide?: boolean
}

const lightBgArray: ButtonColor[] = ["green", "red"]
const Button = ({ color = "bg1", status = "enabled", isWide, ...props }: ButtonProps & WithButtonProps) => {
    const { className, children, ...rest } = props

    const isLoaderDark = lightBgArray.includes(color)

    return (
        <button {...rest} className={clsx(buttonVariants({ color, status, isWide }), className)}>
            <Hstack className="items-center">
                {status === "pending" && <Loader isDark={isLoaderDark} />}
                {children}
            </Hstack>
        </button>
    )
}

export default Button
