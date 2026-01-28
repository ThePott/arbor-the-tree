import { type Transition, cubicBezier } from "motion/react"

const DEFAULT_DURATION = 0.2
export const motionTransition: Transition = { duration: DEFAULT_DURATION, ease: cubicBezier(0.07, 1.03, 0, 0.96) }
