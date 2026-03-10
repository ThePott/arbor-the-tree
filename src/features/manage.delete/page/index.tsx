import { Container, FlexOneContainer, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import { debugRender } from "@/shared/config/debug/"
import ManageDeleteTable from "./ManageDeleteTable"

const ManageDeletePage = () => {
    debugRender("ManageDeletePage")
    return (
        <FlexOneContainer isYScrollable className="h-full [scrollbar-gutter:stable]">
            <Container width="xl" isPadded>
                <RoundBox radius="lg" isShadowed color="bg2" padding="xl">
                    <Vstack gap="lg">
                        <Title as="h1">권한 삭제</Title>
                        <ManageDeleteTable />
                    </Vstack>
                </RoundBox>
            </Container>
        </FlexOneContainer>
    )
}

export default ManageDeletePage
