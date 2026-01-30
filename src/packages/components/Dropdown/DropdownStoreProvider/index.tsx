import type { XsToXl } from "@/shared/interfaces"
import type { useFloating } from "@floating-ui/react"
import { createContext, useCallback, useRef, useState, type ReactNode } from "react"
import { createStore, type StoreApi } from "zustand"

type FloatingReturns = ReturnType<typeof useFloating>

export type DropdownExternalValues = {
    width?: XsToXl
    direction?: "left" | "right"
    // NOTE: inline block 등 레이아웃 바꾸는 데에 사용
    className?: string
}
type InternalStoreState = {
    isOn: boolean
    setIsOn: (isOn: boolean) => void
    triggerRef: React.RefObject<HTMLDivElement | null>

    floatingReturns: FloatingReturns | null
    setFloatingReturns: (floatingReturns: FloatingReturns | null) => void
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

                floatingReturns: null,
                setFloatingReturns: (floatingReturns) => set({ floatingReturns }),
            })),
        [externalValues]
    )

    const [store, _setStore] = useState(createStoreSpecificStore)

    return <DropdownStoreContext.Provider value={store}>{children}</DropdownStoreContext.Provider>
}

export { DropdownStoreContext, DropdownStoreProvider }
