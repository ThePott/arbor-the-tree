import { createContext, useContext } from "react"
import { useStore, type StoreApi } from "zustand"

export interface DateNowStoreState {
    value: number
    setValue: (value: number) => void
}

export const DateNowStoreContext = createContext<StoreApi<DateNowStoreState> | null>(null)

export const useDateNowStore = <T>(selectorFn: (state: DateNowStoreState) => T) => {
    const store = useContext(DateNowStoreContext)
    if (!store) throw new Error("---- 아이쿠야 콘텍스트가 없어요!")
    return useStore(store, selectorFn)
}
