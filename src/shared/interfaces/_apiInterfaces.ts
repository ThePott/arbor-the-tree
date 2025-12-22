export type Role = "MAINTAINER" | "PRINCIPAL" | "STUDENT" | "PARENT" | "HELPER"

export interface Me {
    id: number
    name: string
    kakao_id?: number
    email?: string
    phone_number?: string
    role?: Role
}

export interface School {
    id: number
    name: string
}

export interface Hagwon {
    id: number
    name: string
}

export interface Resume {
    role: Role
    hagwon_name: string
    school_name: string
}
