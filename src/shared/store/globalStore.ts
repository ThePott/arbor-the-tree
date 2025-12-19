import { create } from "zustand"
import type { GlobalStoreState } from "./globalStoreState"
import { createJSONStorage, persist } from "zustand/middleware"

const useGlobalStore = create<GlobalStoreState>()(
    persist(
        (set, _get) => ({
            accessToken: null,
            setAccessToken: (accessToken) => set({ accessToken }),
            me: null,
            setMe: (me) => set({ me }),

            isPendingLogin: false,
            setIsPendingLogin: (isPendingLogin) => set({ isPendingLogin }),
        }),
        {
            name: "arbor-store",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ accessToken: state.accessToken, me: state.me }),
        }
    )
)

export default useGlobalStore
