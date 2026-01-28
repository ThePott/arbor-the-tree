import Button from "@/packages/components/Button/Button"
import { Container } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import { useNavigate } from "@tanstack/react-router"
import type { ClientError } from "../../clientError"

type ClientErrorComponenetProps = {
    error: ClientError
}
const ClientErrorComponent = ({ error }: ClientErrorComponenetProps) => {
    const navigate = useNavigate()

    return (
        <Container isPadded>
            <RoundBox padding="xl" radius="lg" isShadowed color="bg0">
                <Title as="h1" isMuted>
                    Cient Error
                </Title>
                <Title as="h2">{error.message}</Title>
                {error.redirect && (
                    <Button onClick={() => navigate({ to: error.redirect?.to })}>{error.redirect.label}</Button>
                )}
            </RoundBox>
        </Container>
    )
}

export default ClientErrorComponent
