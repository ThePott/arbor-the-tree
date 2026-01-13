export type Role = "MAINTAINER" | "PRINCIPAL" | "STUDENT" | "PARENT" | "HELPER"

export type AppUser = {
    id: string
    name: string
    role?: Role
    phone_number?: string
    kakao_id?: string
    email?: string
}

export type Me = {
    id: number
    name: string
    kakao_id?: number
    email?: string
    phone_number?: string
    role?: Role
    school_name?: string
    hagwon_name?: string
}

export type School = {
    id: number
    name: string
}

export type Hagwon = {
    id: number
    name: string
}

export type Resume = {
    id: string
    user_id: string
    role: Role
    school_name?: string // NOTE: 학생 제외하고선 학교 이름이 없음
    hagwon_name: string
    applied_at: string // NOTE: ISOstring
}

export type Book = {
    id: string
    published_year: number
    title: string
}

export type AppError = {
    code: string
    statusCode: number
    message: string
}
