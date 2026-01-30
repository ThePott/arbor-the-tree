import { motionTransition } from "@/shared/utils/framerMotionAnimations"
import { AnimatePresence, motion } from "motion/react"
import { memo, type ReactNode } from "react"
import useMeasure from "react-use-measure"

type ExpandableChildProps = { children: ReactNode }
const ExpandableChild = ({ children }: ExpandableChildProps) => {
    return <div></div>
}

type ExpandableParentProps = { children: ReactNode }
const MyContentExtendable = memo(({ children }: ExpandableParentProps) => {
    // NOTE: 가장 겉에 있는 모션 div는 hegith 변경이 감지될 때마다 animate
    // NOTE: AnimatePresence는 안에 있는 것의 exit을 감지, 애니메이션을 보일 수 있게 함
    // NOTE: dropdown content처럼 나타났다가 없어지는 걸 하고 싶으면 지금처럼 모션 디브 넣고 그 안에 나머지 몰아넣으면 될 텐데
    // TODO: 아코디언의 경우 내용물이 그대로 있어야 하는 거니 exit 애니메이션이 필요한 거랑은 느낌이 다른데...
    // -> children 감싸는 모션 디브가 있을 필요가 없어 보이는데
    const [ref, { height }] = useMeasure()

    return (
        <motion.div animate={{ height }} transition={motionTransition}>
            <AnimatePresence mode="popLayout">
                <motion.div initial="hidden" animate="visible" exit="hidden" key={children?.toString()}>
                    <div ref={ref}>{children}</div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    )
})

export default MyContentExtendable
