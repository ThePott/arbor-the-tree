import type { Me } from "../interfaces"

export interface GlobalStoreState {
    accessToken: string | null
    setAccessToken: (accessToken: string | null) => void
    me: Me | null
    setMe: (me: Me | null) => void
}
