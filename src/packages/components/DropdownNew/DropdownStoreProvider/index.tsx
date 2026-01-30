import { flip, shift, useFloating, type ReferenceType } from "@floating-ui/react"
import { createContext, useCallback, useRef, useState, type ReactNode } from "react"
import { createStore, type StoreApi } from "zustand"

type InternalStoreState = {
    isOn: boolean
    setIsOn: (isOn: boolean) => void

    triggerRef: React.RefObject<HTMLDivElement | null>
    setReference: (node: ReferenceType | null) => void
    setFloating: (node: HTMLElement | null) => void
    floatingStyles: React.CSSProperties
}
export type DropdownStoreState = InternalStoreState
const DropdownStoreContext = createContext<StoreApi<DropdownStoreState> | null>(null)

type StoreProviderProps = { children: ReactNode }
const DropdownStoreProvider = ({ children }: StoreProviderProps) => {
    const triggerRef = useRef<HTMLDivElement>(null)
    const {
        refs: { setFloating, setReference },
        floatingStyles,
    } = useFloating({ middleware: [flip(), shift()], placement: "right" })
    const createStoreSpecificStore = useCallback(
        () =>
            createStore<DropdownStoreState>((set) => ({
                setReference: setReference,
                setFloating: setFloating,
                floatingStyles,
                isOn: false,
                setIsOn: (isOn) => set({ isOn }),
                triggerRef,
            })),
        [setReference, setFloating, floatingStyles]
    )

    const [store, _setStore] = useState(createStoreSpecificStore)

    return <DropdownStoreContext.Provider value={store}>{children}</DropdownStoreContext.Provider>
}

export { DropdownStoreContext, DropdownStoreProvider }
