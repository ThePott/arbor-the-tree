import ExpandableDiv from "@/packages/components/ExpandableDiv/ExpendableDiv"
import { CenterContainer, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import useMediaQuery from "@/shared/utils/use-media-query"

const LandingContentSmall = () => {
    return (
        <RoundBox className="w-full h-full" radius="none">
            <CenterContainer>
                <ExpandableDiv isDramatic={true}>
                    <Vstack className="gap-my-lg items-center">
                        <h1 className="mr-[-24px] text-[48px] font-extralight tracking-[24px]">ARBOR</h1>
                        <h2 className="text-my-lg">arbor: [Latin] tree</h2>
                        <p>이제 숲으로 성장할 차례입니다</p>
                    </Vstack>
                </ExpandableDiv>
            </CenterContainer>
        </RoundBox>
    )
}

const LandingContentBig = () => {
    return (
        <CenterContainer>
            <ExpandableDiv isDramatic={true}>
                <RoundBox color="bg2" className="px-[96px] py-[48px]" isShadowed radius="lg">
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

const LandingPage = () => {
    const { isBig } = useMediaQuery()

    if (isBig) return <LandingContentBig />
    return <LandingContentSmall />
}

export default LandingPage
