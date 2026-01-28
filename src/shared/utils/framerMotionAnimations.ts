import { type Transition, cubicBezier } from "motion/react"

const DEFAULT_DURATION = 0.2
export const motionTransition: Transition = { duration: DEFAULT_DURATION, ease: cubicBezier(0.07, 1.03, 0, 0.96) }

// export const makeAnimation = (animation: Animation, isDramatic: boolean) => {
//     const multiplier = isDramatic ? 8 : 1
//
//     const duration = 0.2 * multiplier
//     const blurRadiusInPixel = 16 * multiplier
//     const transformYInPixel = animation === "drop" ? -16 * multiplier : 0
//     const transition: Transition = { duration, ease: cubicBezier(0.07, 1.03, 0, 0.96) }
//
//     const variants = {
//         hidden: { filter: `blur(${blurRadiusInPixel}px)`, transform: `translateY(${transformYInPixel}px)`, opacity: 0 },
//         visible: { filter: "blur(0px)", transform: "translateY(0px)", opacity: 1 },
//     }
//
//     return { transition, variants }
// }
