import { FullScreen, Vstack } from "@/packages/layouts"
import FlexOneContainer from "@/packages/layouts/_FlexOneContainer"

const LandingPage = () => {
    return (
        <FullScreen isCentered>
            <div className="bg-bg-2 shadow-my-xl w-[800px]">ARBOR</div>
            <Vstack className="h-[800px]">
                <p>asdf</p>
                <FlexOneContainer className="bg-amber-600"> asdf</FlexOneContainer>
            </Vstack>
        </FullScreen>
    )
}

export default LandingPage
