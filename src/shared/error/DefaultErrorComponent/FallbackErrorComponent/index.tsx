import { Container } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"

type FallbackErrorComponentProps = {
    error: Error
    reset: () => void
}
const FallbackErrorComponent = ({ error, reset: _reset }: FallbackErrorComponentProps) => {
    return (
        <Container isPadded>
            <RoundBox padding="xl" radius="lg" isShadowed color="bg0">
                <Title as="h1" isMuted>
                    Fallback Error
                </Title>
                <Title as="h2">{error.message}</Title>
                <p>cause: {String(error.cause)}</p>
                <p>name: {String(error.name)}</p>
            </RoundBox>
        </Container>
    )
}

export default FallbackErrorComponent
