import { Container } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import type { ApiError } from "@/shared/interfaces"
import type { AxiosError } from "axios"

type ApiErrorComponentProps = {
    error: AxiosError<ApiError>
    reset: () => void
}

const ApiErrorComponent = ({ error, reset: _reset }: ApiErrorComponentProps) => {
    return (
        <Container isPadded>
            <RoundBox padding="xl" radius="lg" isShadowed color="bg0">
                <Title as="h1" isMuted>
                    Axios Api Error
                </Title>
                <Title as="h2">{error.response?.data.message}</Title>
                <p>code: {error.response?.data.code}</p>
                <p>cause: {String(error.cause)}</p>
                <p>name: {String(error.name)}</p>
            </RoundBox>
        </Container>
    )
}

export default ApiErrorComponent
