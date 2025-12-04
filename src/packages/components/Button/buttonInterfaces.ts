export const buttonColorArray = ["green", "bg0", "bg1", "bg2", "red", "black"] as const
export type ButtonColor = (typeof buttonColorArray)[number]

export const buttonStatusArray = ["enabled", "disabled", "pending"] as const
export type ButtonStatus = (typeof buttonStatusArray)[number]
