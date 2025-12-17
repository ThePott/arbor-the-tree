import { AnimatePresence, motion } from "motion/react"
import { memo, type ReactNode } from "react"
import useMeasure from "react-use-measure"

const ExpendableDiv = memo(({ children }: { children: ReactNode }) => {
    const [ref, { height }] = useMeasure()
    return (
        <motion.div animate={{ height }}>
            <AnimatePresence mode="popLayout">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={children?.toString()}
                >
                    <div ref={ref}>{children}</div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    )
})

export default ExpendableDiv
