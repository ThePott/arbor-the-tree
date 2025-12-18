import type { ButtonProps, Color } from "@/shared/interfaces"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import type { ButtonColor } from "./buttonInterfaces"
import Loader from "../Loader/Loader"
import { Hstack } from "../layouts"
import { buttonColorToCn } from "@/shared/utils/styles"

const buttonVariants = cva("py-my-sm px-my-md rounded-my-sm my-transition", {
    variants: {
        color: buttonColorToCn,
        status: {
            enabled: "cursor-pointer",
            disabled: "text-fg-muted",
            pending: "text-fg-muted",
        },
        isWide: {
            true: "w-full",
            false: "",
        },
        isShadowed: {
            false: "",
            true: "shadow-my-sm",
        },
        isBorderedOnHover: {
            false: "",
            true: "",
        },
    },
    compoundVariants: [
        { color: ["bg0", "bg1", "bg2"], status: "enabled", className: "text-fg-vivid" },
        { color: ["bg0", "bg1", "bg2"], status: ["disabled", "pending"], className: "text-fg-muted" },

        { color: ["green", "red"], status: "enabled", className: "text-fg-inverted-vivid" },
        { color: ["green", "red"], status: ["disabled", "pending"], className: "text-fg-inverted-muted" },

        { color: "bg0", status: "enabled", className: "hover:bg-bg-1 active:bg-bg-2" },
        { color: "bg1", status: "enabled", className: "hover:bg-bg-2 active:bg-bg-3" },
        { color: "bg2", status: "enabled", className: "hover:bg-bg-3 active:bg-washed-black" },

        { color: "green", status: "enabled", className: "hover:bg-washed-green-1 active:bg-washed-green-2" },
        { color: "green", status: "disabled", className: "bg-washed-green-neg-1" },
        { color: "green", status: "pending", className: "bg-washed-green-neg-1" },

        { color: "red", status: "enabled", className: "bg-washed-red hover:bg-washed-red-1 active:bg-washed-red-2" },
        { color: "red", status: "disabled", className: "bg-washed-red-neg-1" },
        { color: "red", status: "pending", className: "bg-washed-red-neg-1" },

        {
            isBorderedOnHover: true,
            status: "enabled",
            className: "border border-transparent hover:border-border-muted",
        },
    ],
})

interface WithButtonProps {
    color?: Extract<Color, ButtonColor>
    status?: "enabled" | "disabled" | "pending"
    isWide?: boolean
    isShadowed?: boolean
    isBorderedOnHover?: boolean
    isOnLeft?: boolean
}

const lightBgArray: ButtonColor[] = ["green", "red"]
const Button = ({
    color = "bg1",
    status = "enabled",
    isWide,
    isShadowed = false,
    isBorderedOnHover = false,
    isOnLeft = false,
    ...props
}: ButtonProps & WithButtonProps) => {
    const { className, children, disabled, ...rest } = props

    const isLoaderDark = lightBgArray.includes(color)

    return (
        <button
            {...rest}
            disabled={status !== "enabled"}
            className={clsx(buttonVariants({ color, status, isWide, isBorderedOnHover, isShadowed }), className)}
        >
            <Hstack className={clsx("items-center", isOnLeft ? "" : "justify-center")}>
                {status === "pending" && <Loader isDark={isLoaderDark} />}
                {children}
            </Hstack>
        </button>
    )
}

export default Button
