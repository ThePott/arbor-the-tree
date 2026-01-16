import type { ValueLabel } from "@/shared/interfaces"
import { createContext, useCallback, useRef, useState, type ReactNode } from "react"
import { createStore, type StoreApi } from "zustand"

export type LocalAutoCompleteExternalValues = {
    placeholder: string
    optionArray: ValueLabel[]
    isRed: boolean
    onChange: (inputValue: string) => void
}

type InternalStoreState = {
    isContentOn: boolean
    setIsContentOn: (isFocused: boolean) => void

    inputValue: string
    setInputValue: (inputValue: string) => void

    inputRef: React.RefObject<HTMLInputElement | null>
}

export type LocalAutoCompleteStoreState = LocalAutoCompleteExternalValues & InternalStoreState
const LocalAutoCompleteStoreContext = createContext<StoreApi<LocalAutoCompleteStoreState> | null>(null)

type StoreProviderProps = {
    children: ReactNode
} & LocalAutoCompleteExternalValues
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
            })),
        [initialValues]
    )

    const [store, _setStore] = useState(createStoreSpecificStore)

    return <LocalAutoCompleteStoreContext.Provider value={store}>{children}</LocalAutoCompleteStoreContext.Provider>
}

export { LocalAutoCompleteStoreContext, LocalAutoCompleteStoreProvider }
