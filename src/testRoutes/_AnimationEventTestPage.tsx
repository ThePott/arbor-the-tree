import Button from "@/packages/components/Button"
import { Vstack } from "@/packages/components/layouts"
import Container from "@/packages/components/layouts/_Container"
import RoundBox from "@/packages/components/RoundBox"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import { Activity, useEffect, useState, type ReactNode } from "react"
import "./_AnimationTestPage.css"

const animationWrapperVariants = cva("", {
    variants: {
        isOn: {
            true: "drop-in-md",
            false: "blur-drop",
        },
    },
})

interface AnimationWrapperProps {
    isOn: boolean
    children: ReactNode
}

/**
 * MUST USE isOn in key
 */
const AnimationWrapper = ({ isOn, children }: AnimationWrapperProps) => {
    const [isVisible, setIsVisible] = useState<boolean | null>(null)

    useEffect(() => {
        if (isVisible !== null) {
            return
        }

        setIsVisible(isOn)
    }, [isOn])

    const handleAnimationEnd = () => {
        if (isOn === isVisible) {
            setIsVisible(!isOn)
        }

        return
    }

    if (!isVisible) {
        return null
    }

    return (
        <div onAnimationEnd={handleAnimationEnd} className={clsx(animationWrapperVariants({ isOn }))}>
            {children}
        </div>
    )
}

const DummyBox = () => {
    return (
        <RoundBox padding="xl" isBordered color="bg2">
            this is something
        </RoundBox>
    )
}

const AnimationEventTestPage = () => {
    const [isOn, setIsOn] = useState(false)

    return (
        <Container width="md" isPadded>
            <RoundBox padding="xl" className="drop-in-md">
                <Vstack>
                    <Button onClick={() => setIsOn(!isOn)}>{JSON.stringify(isOn)}</Button>
                    <AnimationWrapper isOn={isOn}>
                        <DummyBox />
                    </AnimationWrapper>
                </Vstack>
            </RoundBox>
        </Container>
    )
}

export default AnimationEventTestPage
