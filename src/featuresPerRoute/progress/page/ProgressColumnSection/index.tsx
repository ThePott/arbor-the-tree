import { FlexOneContainer, Hstack } from "@/packages/components/layouts"
import ProgressColumn from "./ProgressColumn"

const ProgressColumnSection = () => {
    return (
        <FlexOneContainer className="pt-my-lg pl-my-lg" isXScrollable>
            <Hstack className="h-full">
                <ProgressColumn />
                <ProgressColumn />
                <ProgressColumn />
                <ProgressColumn />
                <ProgressColumn />
                <ProgressColumn />
            </Hstack>
        </FlexOneContainer>
    )
}

export default ProgressColumnSection
