import Button from "@/packages/components/Button"
import Container from "@/packages/components/layouts/_Container"
import RoundBox from "@/packages/components/RoundBox"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"

const AnimationEventTestPage = () => {
    const [isVisible, setIsVisible] = useState(true)

    return (
        <Container>
            <RoundBox isShadowed>
                <AnimatePresence initial={false}>
                    <motion.div>
                        <Button onClick={() => setIsVisible(!isVisible)}>{isVisible ? "Hide" : "Show"}</Button>
                    </motion.div>
                    {isVisible ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            key="box"
                        >
                            <RoundBox color="bg2" isShadowed padding="xl">
                                여기에다가 아무거나 적자
                            </RoundBox>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </RoundBox>
        </Container>
    )
}

export default AnimationEventTestPage
