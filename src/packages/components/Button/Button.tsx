import type { Color } from "@/shared/interfaces"
import { buttonColorToCn } from "@/shared/utils/styles"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import type { ComponentPropsWithRef, ElementType } from "react"
import Loader from "../Loader/Loader"
import { Hstack } from "../layouts"
import type { ButtonColor } from "./buttonInterfaces"

const buttonVariants = cva("rounded-my-sm my-transition", {
    variants: {
        color: buttonColorToCn,
        status: {
            enabled: "cursor-pointer",
            disabled: "",
            pending: "",
        },
        space: {
            normal: "py-my-sm px-my-md",
            wide: "w-full",
            tight: "p-my-xs",
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
        // NOTE: text colors
        { color: ["bg0", "bg1", "bg2"], className: "text-fg-vivid disabled:text-fg-muted" },
        { color: ["green", "red"], className: "text-fg-inverted-vivid disabled:text-fg-inverted-muted" },

        // NOTE: background colors
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

interface WithButtonProps<T extends ElementType = "button"> {
    as?: T
    color?: Extract<Color, ButtonColor>
    status?: "enabled" | "disabled" | "pending"
    // isWide?: boolean
    isShadowed?: boolean
    isBorderedOnHover?: boolean
    isOnLeft?: boolean
    space?: "wide" | "tight" | "normal"
}
type ButtonProps<T extends ElementType> = WithButtonProps<T> & Omit<ComponentPropsWithRef<T>, keyof WithButtonProps<T>>

const lightBgArray: ButtonColor[] = ["green", "red"]

const Button = <T extends ElementType>({
    as,
    color = "bg1",
    status = "enabled",
    space = "normal",
    isShadowed = false,
    isBorderedOnHover = false,
    isOnLeft = false,
    ...props
}: ButtonProps<T>) => {
    const { className, children, ...rest } = props

    const isLoaderDark = lightBgArray.includes(color)

    const Component: ElementType = as ?? "button"
    return (
        <Component
            {...rest}
            disabled={status !== "enabled"}
            className={clsx(buttonVariants({ color, status, space, isBorderedOnHover, isShadowed }), className)}
        >
            <Hstack className={clsx("items-center", isOnLeft ? "text-left" : "justify-center")}>
                {status === "pending" && <Loader isDark={isLoaderDark} />}
                {children}
            </Hstack>
        </Component>
    )
}

export default Button
