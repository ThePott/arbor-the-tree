import type { ButtonProps, Color } from "@/shared/interfaces"
import { buttonColorToCn } from "@/shared/utils/styles"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import type { ButtonColor } from "./buttonInterfaces"
import Loader from "../Loader/Loader"
import { Hstack } from "../layouts"

const buttonVariants = cva("py-my-sm px-my-md rounded-my-sm  transition shadow-my-sm", {
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
        { status: "enabled", color: "bg0", className: "hover:bg-bg-1 active:bg-bg-2 cursor-pointer" },
        { status: "enabled", color: "bg1", className: "hover:bg-bg-2 active:bg-bg-3 cursor-pointer" },
        { status: "enabled", color: "bg2", className: "hover:bg-bg-3 active:bg-washed-black cursor-pointer" },
        {
            status: "enabled",
            color: "green",
            className: "hover:bg-washed-green-1 active:bg-washed-green-2 cursor-pointer",
        },
        { status: "enabled", color: "red", className: "hover:bg-washed-red-1 active:bg-washed-red-2 cursor-pointer" },
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
