import { createContext, useContext, useState, type ReactNode } from "react"
import { createStore, useStore, type StateCreator, type StoreApi } from "zustand"

const createLocalStore = <TPassedProps, TDefaultProps>(
    defaultInitializer: StateCreator<TDefaultProps, [], [], TDefaultProps>
) => {
    const LocalStoreContext = createContext<StoreApi<TPassedProps & TDefaultProps> | null>(null)

    const useLocalStore = <T,>(selectorFn: (state: TPassedProps & TDefaultProps) => T) => {
        const localStore = useContext(LocalStoreContext)
        if (!localStore) {
            throw new Error("---- 콘텍스트가 없어요!")
        }

        return useStore(localStore, selectorFn)
    }

    const LocalStoreProvider = ({ passedProps, children }: { passedProps: TPassedProps; children: ReactNode }) => {
        const createLocalStore = createStore<TPassedProps & TDefaultProps>((...params) => ({
            ...defaultInitializer(...params),
            ...passedProps,
        }))
        const [localStore, _setLocalStore] = useState(createLocalStore)
        return <LocalStoreContext.Provider value={localStore}>{children}</LocalStoreContext.Provider>
    }

    return { useLocalStore, LocalStoreProvider }
}

export default createLocalStore
