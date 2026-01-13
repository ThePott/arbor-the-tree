import Button from "@/packages/components/Button/Button"
import { Container } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"

const DefaultError = ({ error, reset }: { error: Error; reset: () => void }) => {
    return (
        <Container isPadded>
            <RoundBox padding="xl" radius="lg" isShadowed color="bg0">
                <Title as="h1">messsage: {String(error.message)}</Title>
                <p>cause: {String(error.cause)}</p>
                <p>name: {String(error.name)}</p>
                <Button onClick={reset}>reset</Button>
            </RoundBox>
        </Container>
    )
}

export default DefaultError
