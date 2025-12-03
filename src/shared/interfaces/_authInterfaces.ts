export type Role = "maintainer" | "principal" | "student" | "parent" | "helper"

export interface Me {
    id: number
    name: string
    kakao_id?: number
    email?: string
    phone_number?: string
    role?: Role
}
