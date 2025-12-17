import { CenterContainer, Vstack } from "@/packages/components/layouts"
import DropAnimation from "@/packages/components/motions/DropAnimation"
import RoundBox from "@/packages/components/RoundBox"

const LandingPage = () => {
    return (
        <CenterContainer>
            <DropAnimation isOn={true} intensity="lg">
                <RoundBox color="bg2" className="px-24 py-[48px]" isShadowed radius="lg">
                    <Vstack className="gap-my-lg items-center">
                        <h1 className="mr-[-48px] text-[96px] font-extralight tracking-[48px]">ARBOR</h1>
                        <h2 className="text-my-xl">arbor: [Latin] tree</h2>
                        <p>이제 숲으로 성장할 차례입니다</p>
                    </Vstack>
                </RoundBox>
            </DropAnimation>
        </CenterContainer>
    )
}

export default LandingPage
