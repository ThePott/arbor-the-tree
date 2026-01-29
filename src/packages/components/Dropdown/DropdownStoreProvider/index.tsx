import type { XsToXl } from "@/shared/interfaces"
import { createContext, useCallback, useRef, useState, type ReactNode } from "react"
import { createStore, type StoreApi } from "zustand"

export type DropdownExternalValues = {
    width?: XsToXl
}
type InternalStoreState = {
    isOn: boolean
    setIsOn: (isOn: boolean) => void
    triggerRef: React.RefObject<HTMLDivElement | null>
}
export type DropdownStoreState = DropdownExternalValues & InternalStoreState
const DropdownStoreContext = createContext<StoreApi<DropdownStoreState> | null>(null)

type StoreProviderProps = {
    children: ReactNode
} & DropdownExternalValues
const DropdownStoreProvider = ({ children, ...externalValues }: StoreProviderProps) => {
    const triggerRef = useRef<HTMLDivElement>(null)
    const createStoreSpecificStore = useCallback(
        () =>
            createStore<DropdownStoreState>((set) => ({
                ...externalValues,
                isOn: false,
                setIsOn: (isOn) => set({ isOn }),
                triggerRef,
            })),
        [externalValues]
    )

    const [store, _setStore] = useState(createStoreSpecificStore)

    return <DropdownStoreContext.Provider value={store}>{children}</DropdownStoreContext.Provider>
}

export { DropdownStoreContext, DropdownStoreProvider }
