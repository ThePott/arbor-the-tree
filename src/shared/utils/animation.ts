import { cubicBezier, type Transition } from "motion/react"

export const ease = cubicBezier(0.07, 1.03, 0, 0.96)

export const makeTransition = (isDramatic?: boolean): Transition => {
    const multiplier = isDramatic ? 8 : 1
    const duration: number = 0.2 * multiplier

    return { duration, ease }
}
