import { FullScreen, Vstack } from "@/packages/layouts"
import RoundBox from "@/packages/RoundBox"

const LandingPage = () => {
    return (
        <FullScreen isCentered>
            <RoundBox color="bg2" className="px-[96px] py-[48px]" isShadowed radius="lg">
                <Vstack className="gap-my-lg items-center">
                    <h1 className="mr-[-48px] text-[96px] font-extralight tracking-[48px]">ARBOR</h1>
                    <h2 className="text-my-xl">arbor: [Latin] tree</h2>
                    <p>이제 숲으로 성장할 차례입니다</p>
                </Vstack>
            </RoundBox>
        </FullScreen>
    )
}

export default LandingPage
