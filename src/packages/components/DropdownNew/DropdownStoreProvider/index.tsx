import { useFloating } from "@floating-ui/react"
import { createContext, useCallback, useRef, useState, type ReactNode } from "react"
import { createStore, type StoreApi } from "zustand"

type UseFloatingReturns = ReturnType<typeof useFloating>

type InternalStoreState = {
    isOn: boolean
    setIsOn: (isOn: boolean) => void
    triggerRef: React.RefObject<HTMLDivElement | null>

    floatingReturns: UseFloatingReturns | null
    setFloatingReturns: (useFloatingReturns: UseFloatingReturns | null) => void
}
export type DropdownStoreState = InternalStoreState
const DropdownStoreContext = createContext<StoreApi<DropdownStoreState> | null>(null)

type StoreProviderProps = { children: ReactNode }
const DropdownStoreProvider = ({ children }: StoreProviderProps) => {
    const triggerRef = useRef<HTMLDivElement>(null)
    const createStoreSpecificStore = useCallback(
        () =>
            createStore<DropdownStoreState>((set) => ({
                isOn: false,
                setIsOn: (isOn) => set({ isOn }),
                triggerRef,

                floatingReturns: null,
                setFloatingReturns: (floatingReturns) => set({ floatingReturns: floatingReturns }),
            })),
        []
    )

    const [store, _setStore] = useState(createStoreSpecificStore)

    return <DropdownStoreContext.Provider value={store}>{children}</DropdownStoreContext.Provider>
}

export { DropdownStoreContext, DropdownStoreProvider }
