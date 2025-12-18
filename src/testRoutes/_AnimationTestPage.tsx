import { Container, Hstack, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import "./_AnimationTestPage.css"
import { memo, useState } from "react"
import Button from "@/packages/components/Button/Button"
import { AnimatePresence, motion, MotionConfig } from "motion/react"
import useMeasure from "react-use-measure"
import ExpandableDiv from "@/packages/components/ExpandableDiv/ExpendableDiv"

const Box = memo(() => {
    return (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} inherit={false} layout>
            <RoundBox color="red" padding="xl">
                this is box
            </RoundBox>
        </motion.div>
    )
})

const AnimationSelfTest = () => {
    const [idArray, setIdArray] = useState<number[]>([])

    const [ref, { height }] = useMeasure()

    const handleAdd = () => {
        setIdArray([...idArray, Date.now()])
    }
    const handlePop = () => {
        idArray.pop()
        setIdArray([...idArray])
    }
    const handleShift = () => {
        idArray.shift()
        setIdArray([...idArray])
    }

    return (
        <MotionConfig transition={{ duration: 1 }}>
            <Hstack>
                <Button onClick={handleShift}>shift</Button>
                <Button onClick={handlePop}>pop</Button>
                <Button onClick={handleAdd}>add</Button>
            </Hstack>
            <RoundBox isBordered padding="md">
                <ExpandableDiv>
                    {idArray.map((id) => (
                        <Box key={id} />
                    ))}
                </ExpandableDiv>
            </RoundBox>
            <motion.div animate={{ height }}>
                <RoundBox padding="md" color="bg3" ref={ref}>
                    <Vstack gap="xl">
                        <AnimatePresence></AnimatePresence>
                    </Vstack>
                </RoundBox>
            </motion.div>
        </MotionConfig>
    )
}

const AnimationYoutubeTutorial = () => {
    const [isLong, setIsLong] = useState(false)
    const [ref, { height }] = useMeasure()
    return (
        <MotionConfig transition={{ duration: 1 }}>
            <RoundBox isBordered padding="xl">
                <Vstack>
                    <Button onClick={() => setIsLong(!isLong)}>toggle length</Button>
                    <RoundBox color="bg2" padding="lg" className="overflow-hidden">
                        <motion.div animate={{ height }}>
                            <AnimatePresence>
                                <motion.div
                                    initial={{ opacity: 0, translateX: "100px" }}
                                    animate={{ opacity: 1, translateX: 0 }}
                                    exit={{ opacity: 0, translateX: "-100px" }}
                                    key={Number(isLong)}
                                    className="relative"
                                >
                                    <div ref={ref} className="absolute">
                                        {isLong && (
                                            <p>
                                                asdfkl asDFFHJK alDFHJkasldHASjkdf ASDHJKf SAHDJKf HASDJKf HASJKlf
                                                ASHDjk ASdhf KLASJfH KJASD asdfkjlas[ "(])asdhFKJASdfhASKJdllHASJKdf
                                                HASJKDLf HASJKDLf ASHJK ASKJLhASKJLHASKjld HASHKJLD AS"]
                                            </p>
                                        )}
                                        {!isLong && <p>short message</p>}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </RoundBox>
                </Vstack>
            </RoundBox>
        </MotionConfig>
    )
}

const AnimationTestPage = () => {
    const [isMineVisible, setIsMineVisible] = useState(false)
    return (
        <Container width="md" isPadded>
            <Vstack gap="xl">
                <Hstack>
                    <Button onClick={() => setIsMineVisible(!isMineVisible)}>isMine toggle</Button>
                </Hstack>
                {isMineVisible && <AnimationSelfTest />}
                {!isMineVisible && <AnimationYoutubeTutorial />}
            </Vstack>
        </Container>
    )
}

export default AnimationTestPage
