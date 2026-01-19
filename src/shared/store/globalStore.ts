import { debugStore } from "@/shared/config/debug/debug"
import { create } from "zustand"
import type { GlobalStoreState } from "./globalStoreState"
import { createJSONStorage, persist } from "zustand/middleware"

const useGlobalStore = create<GlobalStoreState>()(
    persist(
        (set, get) => ({
            accessToken: null,
            setAccessToken: (accessToken) => {
                debugStore("GlobalStore:setAccessToken %o", accessToken)
                set({ accessToken })
            },
            refreshToken: null,
            setRefreshToken: (refreshToken) => {
                debugStore("GlobalStore:setRefreshToken %o", refreshToken)
                set({ refreshToken })
            },
            me: null,
            setMe: (me) => {
                debugStore("GlobalStore:setMe %o", me)
                set({ me })
            },
            logout: () => {
                debugStore("GlobalStore:logout")
                const { setAccessToken, setRefreshToken, setMe } = get()
                setAccessToken(null)
                setRefreshToken(null)
                setMe(null)
            },

            resume: null,
            setResume: (resume) => {
                debugStore("GlobalStore:setResume %o", resume)
                set({ resume })
            },

            isPendingLogin: false,
            setIsPendingLogin: (isPendingLogin) => {
                debugStore("GlobalStore:setIsPendingLogin %o", isPendingLogin)
                set({ isPendingLogin })
            },

            isBodyScrollable: true,
            setIsBodyScrollable: (isBodyScrollable) => {
                debugStore("GlobalStore:setIsBodyScrollable %o", isBodyScrollable)
                set({ isBodyScrollable })
            },
        }),
        {
            name: "arbor-store",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ accessToken: state.accessToken, refreshToken: state.refreshToken, me: state.me }),
        }
    )
)

export default useGlobalStore
