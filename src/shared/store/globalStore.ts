import { create } from "zustand"
import type { GlobalStoreState } from "./globalStoreState"
import { createJSONStorage, persist } from "zustand/middleware"

const useGlobalStore = create<GlobalStoreState>()(
    persist(
        (set, _get) => ({
            accessToken: null,
            setAccessToken: (accessToken) => set({ accessToken }),
            refreshToken: null,
            setRefreshToken: (refreshToken) => set({ refreshToken }),
            me: null,
            setMe: (me) => set({ me }),

            resume: null,
            setResume: (resume) => set({ resume }),

            isPendingLogin: false,
            setIsPendingLogin: (isPendingLogin) => set({ isPendingLogin }),

            isBodyScrollable: true,
            setIsBodyScrollable: (isBodyScrollable) => set({ isBodyScrollable }),
        }),
        {
            name: "arbor-store",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ accessToken: state.accessToken, refreshToken: state.refreshToken, me: state.me }),
        }
    )
)

export default useGlobalStore
