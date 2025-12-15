import Button from "@/packages/components/Button"
import { FullScreen, Vstack } from "@/packages/components/layouts"
import DropAnimation from "@/packages/components/motions/DropAnimation"
import RoundBox from "@/packages/components/RoundBox"
import { useState } from "react"

const LandingPage = () => {
    const [isOn, setIsOn] = useState(false)
    return (
        <FullScreen isCentered>
            <Button onClick={() => setIsOn(!isOn)}>Toggle</Button>
            <DropAnimation isOn={isOn} intensity="lg">
                <RoundBox color="bg2" className="px-24 py-[48px]" isShadowed radius="lg">
                    <Vstack className="gap-my-lg items-center">
                        <h1 className="mr-[-48px] text-[96px] font-extralight tracking-[48px]">ARBOR</h1>
                        <h2 className="text-my-xl">arbor: [Latin] tree</h2>
                        <p>이제 숲으로 성장할 차례입니다</p>
                    </Vstack>
                </RoundBox>
            </DropAnimation>
        </FullScreen>
    )
}

export default LandingPage
