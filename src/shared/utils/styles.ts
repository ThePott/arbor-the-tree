import type { Color, None, XsToXl } from "../interfaces"
import { squashObject } from "./squashObject"

export const gapToCn: Record<XsToXl | None, string> = {
    none: "gap-0",
    xs: "gap-my-xs",
    sm: "gap-my-sm",
    md: "gap-my-md",
    lg: "gap-my-lg",
    xl: "gap-my-xl",
}

export const paddingToCn: Record<XsToXl | None, string> = {
    none: "p-0",
    xs: "p-my-xs",
    sm: "p-my-sm",
    md: "p-my-md",
    lg: "p-my-lg",
    xl: "p-my-xl",
}

export const boxColorToCn: Record<Color, string> = {
    bgNeg1: "bg-bg-neg-1",
    bg0: "bg-bg-0",
    bg1: "bg-bg-1",
    bg2: "bg-bg-2",
    bg3: "bg-bg-3",
    red: "bg-washed-red",
    blue: "bg-washed-blue",
    green: "bg-washed-green",
    darkRed: "bg-dark-red",
    darkBlue: "bg-dark-blue",
    darkYellow: "bg-dark-yellow",
}

export const buttonColorArray = ["green", "bg0", "bg1", "bg2"] as const
export type ButtonColor = (typeof buttonColorArray)[number]

export const buttonStatusArray = ["enabled", "disabled", "pending"] as const
export type ButtonStatus = (typeof buttonStatusArray)[number]

const buttonColorToTextCn: Record<ButtonColor, string> = {
    green: "text-fg-inverted",
    bg0: "",
    bg1: "",
    bg2: "",
}

export const buttonColorToCn = squashObject(buttonColorArray, boxColorToCn, buttonColorToTextCn)

export const widthToCn: Record<XsToXl, string> = {
    xs: "w-[200px]",
    sm: "w-[400px]",
    md: "w-[600px]",
    lg: "w-[800px]",
    xl: "w-[1000px]",
}
