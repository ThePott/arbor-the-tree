import { Container, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import ManageDeleteTable from "./ManageDeleteTable"

const ManageDeletePage = () => {
    return (
        <Container width="xl" isPadded>
            <RoundBox radius="lg" isShadowed color="bg2" padding="xl">
                <Vstack gap="lg">
                    <Title as="h1">권한 관리</Title>
                    <ManageDeleteTable />
                </Vstack>
            </RoundBox>
        </Container>
    )
}

export default ManageDeletePage
