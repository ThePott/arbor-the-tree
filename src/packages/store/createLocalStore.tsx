import { createContext, useContext, useState, type ReactNode } from "react"
import { createStore, useStore, type StateCreator, type StoreApi } from "zustand"

const createLocalStore = <TPassed, TDefault>(
    defaultInitializer: StateCreator<TPassed & TDefault, [], [], TPassed & TDefault>
) => {
    const LocalStoreContext = createContext<StoreApi<TPassed & TDefault> | null>(null)

    const useLocalStore = <T,>(selectorFn: (state: TPassed & TDefault) => T) => {
        const localStore = useContext(LocalStoreContext)
        if (!localStore) {
            throw new Error("---- 콘텍스트가 없어요!")
        }

        return useStore(localStore, selectorFn)
    }

    const LocalStoreProvider = ({ children }: { children: ReactNode }) => {
        const createLocalStore = createStore(defaultInitializer)
        const [localStore, _setLocalStore] = useState(createLocalStore)
        return <LocalStoreContext.Provider value={localStore}>{children}</LocalStoreContext.Provider>
    }

    return { LocalStoreContext, useLocalStore, LocalStoreProvider }
}

export default createLocalStore
