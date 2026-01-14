import type { Me, Resume } from "../interfaces"

export interface GlobalStoreState {
    accessToken: string | null
    setAccessToken: (accessToken: string | null) => void
    refreshToken: string | null
    setRefreshToken: (refreshToken: string | null) => void
    me: Me | null
    setMe: (me: Me | null) => void
    logout: () => void

    resume: Resume | null
    setResume: (resume: Resume | null) => void

    isPendingLogin: boolean
    setIsPendingLogin: (isPendingLogin: boolean) => void

    isBodyScrollable: boolean
    setIsBodyScrollable: (isBodyScrollable: boolean) => void
}
