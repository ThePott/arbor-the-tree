import type { useFloating } from "@floating-ui/react"
import { createContext, useCallback, useRef, useState, type ReactNode } from "react"
import { createStore, type StoreApi } from "zustand"
import type { LocalAutoCompleteProps } from ".."

type FloatingReturns = ReturnType<typeof useFloating>

type InternalStoreState = {
    isContentOn: boolean
    setIsContentOn: (isFocused: boolean) => void

    inputValue: string
    setInputValue: (inputValue: string) => void

    inputRef: React.RefObject<HTMLInputElement | null>

    floatingReturns: FloatingReturns | null
    setFloatingReturns: (floatingReturns: FloatingReturns | null) => void
}

export type LocalAutoCompleteStoreState = LocalAutoCompleteProps & InternalStoreState
const LocalAutoCompleteStoreContext = createContext<StoreApi<LocalAutoCompleteStoreState> | null>(null)

type StoreProviderProps = {
    children: ReactNode
} & LocalAutoCompleteProps
const LocalAutoCompleteStoreProvider = ({ children, ...initialValues }: StoreProviderProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const createStoreSpecificStore = useCallback(
        () =>
            createStore<LocalAutoCompleteStoreState>((set, get) => ({
                ...initialValues,

                isContentOn: false,
                setIsContentOn: (isContentOn) => set({ isContentOn }),
                inputValue: "",
                setInputValue: (inputValue) => {
                    set({ inputValue })
                    get().onChange(inputValue)
                },
                inputRef,

                floatingReturns: null,
                setFloatingReturns: (floatingReturns) => set({ floatingReturns }),
            })),
        [initialValues]
    )

    const [store, _setStore] = useState(createStoreSpecificStore)

    return <LocalAutoCompleteStoreContext.Provider value={store}>{children}</LocalAutoCompleteStoreContext.Provider>
}

export { LocalAutoCompleteStoreContext, LocalAutoCompleteStoreProvider }
