import { Container, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"

const ManageResumePage = () => {
    return (
        <Container isPadded>
            <RoundBox color="bg2" padding="xl">
                <Vstack gap="lg">
                    <Title as="h1" isMuted>
                        지원 현황
                    </Title>
                    <p>여기에 지원서 표로 작성해야 함</p>
                </Vstack>
            </RoundBox>
        </Container>
    )
}

export default ManageResumePage
