export type Role = "MAINTAINER" | "PRINCIPAL" | "STUDENT" | "PARENT" | "HELPER"

export interface Me {
    id: number
    name: string
    kakao_id?: number
    email?: string
    phone_number?: string
    role?: Role
}
