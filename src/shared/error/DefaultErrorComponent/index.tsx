import { ClientError } from "../clientError"
import ApiErrorComponent from "./ApiErrorComponent"
import ClientErrorComponent from "./CientErrorComponent"
import FallbackErrorComponent from "./FallbackErrorComponent"
import { isAxiosApiError } from "./typeguard"

export type DefaultErrorComponentProps = {
    error: Error
    reset: () => void
}

const DefaultErrorComponent = ({ error, reset }: DefaultErrorComponentProps) => {
    if (ClientError.isClientError(error)) return <ClientErrorComponent error={error} />

    if (isAxiosApiError(error)) return <ApiErrorComponent error={error} reset={reset} />

    return <FallbackErrorComponent error={error} reset={reset} />
}

export default DefaultErrorComponent
