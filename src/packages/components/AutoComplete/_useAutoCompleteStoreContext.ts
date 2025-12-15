import { createContext, useContext } from "react"
import { createStore, useStore, type StoreApi } from "zustand"
import type { AutoCompleteStoreState } from "./_AutoCompleteContextProvider"

export const StoreContext = createContext<StoreApi<AutoCompleteStoreState> | null>(null)

export const useAutoCompleteStore = <T>(selectorFn: (state: AutoCompleteStoreState) => T) => {
    const store = useContext(StoreContext)
    if (!store) {
        throw new Error("---- 콘텍스트가 없어요!")
    }

    return useStore(store, selectorFn)
}
