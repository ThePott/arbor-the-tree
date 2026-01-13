import { Container } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"

const DefaultNotFound = () => {
    return (
        <Container isPadded>
            <RoundBox color="bg0" padding="xl" radius="lg" isShadowed>
                <Title as="h1">this is default not found</Title>
            </RoundBox>
        </Container>
    )
}

export default DefaultNotFound
