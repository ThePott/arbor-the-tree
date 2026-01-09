export type Role = "MAINTAINER" | "PRINCIPAL" | "STUDENT" | "PARENT" | "HELPER"

export interface Me {
    id: number
    name: string
    kakao_id?: number
    email?: string
    phone_number?: string
    role?: Role
    school_name?: string
    hagwon_name?: string
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

export interface Book {
    id: string
    published_year: number
    title: string
}

export type AppError = {
    code: string
    statusCode: number
    message: string
}
