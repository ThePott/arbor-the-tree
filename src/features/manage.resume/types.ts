import type { AppUser, Resume } from "@/shared/interfaces"

export type ExtendedResume = Resume & { users: AppUser }

export const MANAGE_RESUME_ROW_KEY_ARRAY = ["name", "role", "school_name", "hagwon_name", "applied_at"] as const
export type ManageResuemRowKey = (typeof MANAGE_RESUME_ROW_KEY_ARRAY)[number]

export type ManageResumeRow = {
    [K in ManageResuemRowKey]: K extends "school_name" ? string | undefined : string
} & { id: string }

export const MANAGE_RESUME_ROW_KEY_TO_LABEL: Record<ManageResuemRowKey, string> = {
    name: "이름",
    school_name: "학교",
    hagwon_name: "학원",
    role: "권한",
    applied_at: "지원일",
}
