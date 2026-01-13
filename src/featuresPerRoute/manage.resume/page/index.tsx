import { Container, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import ManageResumeTable from "./ManageResumeTable"

const ManageResumePage = () => {
    return (
        <Container width="xl" isPadded>
            <RoundBox color="bg2" padding="xl" radius="lg" isShadowed>
                <Vstack gap="lg">
                    <Title as="h1">지원 현황</Title>
                    <ManageResumeTable />
                </Vstack>
            </RoundBox>
        </Container>
    )
}

export default ManageResumePage
