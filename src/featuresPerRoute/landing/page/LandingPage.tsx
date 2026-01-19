import ExpandableDiv from "@/packages/components/ExpandableDiv/ExpendableDiv"
import { CenterContainer, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import { debugRender } from "@/shared/config/debug/debug"

const LandingPage = () => {
    debugRender("LandingPage")
    return (
        <CenterContainer>
            <ExpandableDiv isDramatic={true}>
                <RoundBox color="bg2" className="px-24 py-[48px]" isShadowed radius="lg">
                    <Vstack className="gap-my-lg items-center">
                        <h1 className="mr-[-48px] text-[96px] font-extralight tracking-[48px]">ARBOR</h1>
                        <h2 className="text-my-xl">arbor: [Latin] tree</h2>
                        <p>이제 숲으로 성장할 차례입니다</p>
                    </Vstack>
                </RoundBox>
            </ExpandableDiv>
        </CenterContainer>
    )
}

export default LandingPage
