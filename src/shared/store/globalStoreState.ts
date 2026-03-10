import type { Me } from "@/features/profile/type/indes"

export interface GlobalStoreState {
    accessToken: string | null
    setAccessToken: (accessToken: string | null) => void
    refreshToken: string | null
    setRefreshToken: (refreshToken: string | null) => void
    me: Me | null
    setMe: (me: Me | null) => void
    logout: () => void

    isPendingLogin: boolean
    setIsPendingLogin: (isPendingLogin: boolean) => void

    isBodyScrollable: boolean
    setIsBodyScrollable: (isBodyScrollable: boolean) => void

    isSidebarOn: boolean
    setIsSidebarOn: (isSidebarOn: boolean) => void
}
