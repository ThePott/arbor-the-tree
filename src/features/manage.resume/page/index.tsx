import { Container, FlexOneContainer, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import ManageResumeTable from "./ManageResumeTable"

const ManageResumePage = () => {
    return (
        <FlexOneContainer isYScrollable className="h-full [scrollbar-gutter:stable]">
            <Container width="xl" isPadded>
                <RoundBox color="bg2" padding="xl" radius="lg" isShadowed>
                    <Vstack gap="lg">
                        <Title as="h1">권한 요청 현황</Title>
                        <ManageResumeTable />
                    </Vstack>
                </RoundBox>
            </Container>
        </FlexOneContainer>
    )
}

export default ManageResumePage
