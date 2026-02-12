import Button from "@/packages/components/Button/Button"
import { Container, Hstack, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"

const ReviewAssignmentCreatePage = () => {
    return (
        <Container isPadded>
            <RoundBox padding="xl" radius="lg" isShadowed color="bg0">
                <Vstack>
                    <Title as="h1">오답 과제 제작</Title>

                    <Hstack>
                        <Button padding="wide" border="always" color="transparent">
                            미리 보기
                        </Button>
                        <Button padding="wide" color="green">
                            제작
                        </Button>
                    </Hstack>
                </Vstack>
            </RoundBox>
        </Container>
    )
}

export default ReviewAssignmentCreatePage
