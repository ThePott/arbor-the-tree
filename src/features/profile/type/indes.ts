import type { AppUser, Resume } from "@/shared/interfaces"

export type AdditionalInfo = {
    hagwon_name: string | null
    school_name: string | null
}
export type Me = AppUser & { additional_info: AdditionalInfo } & { resume: Resume | null }
