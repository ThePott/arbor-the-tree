import { Container, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"

const ReviewCheckSyllabusPage = () => {
    return (
        <Container isPadded>
            <RoundBox color="bg0" padding="xl" radius="lg" isShadowed>
                <Vstack>
                    <Title as="h1">반을 선택하세요 - 그 다음엔 문제집을 선택하세요</Title>
                    <RoundBox padding="xl" isBordered>
                        this is demo
                    </RoundBox>
                </Vstack>
            </RoundBox>
        </Container>
    )
}

export default ReviewCheckSyllabusPage
