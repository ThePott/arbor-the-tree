import { FlexOneContainer } from "@/packages/components/layouts"
import { Vstack } from "@/packages/components/layouts/_Vstack"
import Title from "@/packages/components/Title/Title"

const BWTable = () => {
    return (
        <Vstack className="h-full grow">
            <Title as="h2" isMuted>
                문제 정보 기입
            </Title>
            <FlexOneContainer isYScrollable>
                <div className="bg-bg-3 h-[1000px] w-full rounded-4xl" />
            </FlexOneContainer>
        </Vstack>
    )
}

export default BWTable
