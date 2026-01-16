export type ClientErrorCode = "UNAUTHORIZED" | "NETWORK" | "UNEXPECTED"

type ClientErrorRedirect = {
    to: string
    label: string
}

export class ClientError extends Error {
    code: ClientErrorCode
    redirect?: ClientErrorRedirect

    constructor(message: string, code: ClientErrorCode, redirect?: ClientErrorRedirect) {
        super(message)
        this.code = code
        this.redirect = redirect
        this.name = "ClientError"
    }

    static Unauthorized(message = "접근 권한이 없습니다", redirect?: ClientErrorRedirect) {
        return new ClientError(message, "UNAUTHORIZED", redirect)
    }

    static Network(message = "네트워크 오류가 발생했습니다", redirect?: ClientErrorRedirect) {
        return new ClientError(message, "NETWORK", redirect)
    }

    static Unexpected(message = "알 수 없는 오류가 발생했습니다", redirect?: ClientErrorRedirect) {
        return new ClientError(message, "UNEXPECTED", redirect)
    }

    static isClientError(error: unknown): error is ClientError {
        return error instanceof ClientError
    }
}
