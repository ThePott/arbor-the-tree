import { Container, FlexOneContainer, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import useReviewCheck from "./hooks"
import ReviewCheckCreateToolbar from "./ReviewCheckCreateToolbar"
import ReviewCheckTopic from "./ReviewCheckTopic"

const ReviewCheckCreatePage = () => {
    const { data } = useReviewCheck()

    if (!data)
        return (
            <RoundBox padding="xl" isBordered>
                ---- I need to create skeleton for this
            </RoundBox>
        )

    return (
        <Vstack gap="none" className="h-full overflow-hidden">
            <ReviewCheckCreateToolbar />
            <FlexOneContainer isYScrollable>
                <Container isPadded width="md">
                    <Title as="h1" className="text-center">{`${data.title} 오답체크`}</Title>
                    <Vstack>
                        {data.topics.map((topic) => (
                            <ReviewCheckTopic key={topic.title} topic={topic} />
                        ))}
                    </Vstack>
                </Container>
            </FlexOneContainer>
        </Vstack>
    )
}

export default ReviewCheckCreatePage
