import { createContext, useCallback, useState, type ReactNode } from "react"
import { createStore, type StoreApi } from "zustand"

type LocalAutocompleteOption = {
    value: string
    label: string
}
export type LocalAutoCompleteExternalValues = {
    placeholder: string | null
    optionArray: LocalAutocompleteOption[]
    isRed: boolean
}

type InternalStoreState = {
    isContentOn: boolean
    setIsContentOn: (isFocused: boolean) => void

    inputValue: string
    setInputValue: (inputValue: string) => void
}

export type LocalAutoCompleteStoreState = LocalAutoCompleteExternalValues & InternalStoreState
const LocalAutoCompleteStoreContext = createContext<StoreApi<LocalAutoCompleteStoreState> | null>(null)

type StoreProviderProps = {
    children: ReactNode
} & LocalAutoCompleteExternalValues
const LocalAutoCompleteStoreProvider = ({ children, ...initialValues }: StoreProviderProps) => {
    const createStoreSpecificStore = useCallback(
        () =>
            createStore<LocalAutoCompleteStoreState>((set, _get) => ({
                ...initialValues,

                isContentOn: false,
                setIsContentOn: (isContentOn) => set({ isContentOn }),
                inputValue: "",
                setInputValue: (inputValue) => set({ inputValue }),
            })),
        [initialValues]
    )

    const [store, _setStore] = useState(createStoreSpecificStore)

    return <LocalAutoCompleteStoreContext.Provider value={store}>{children}</LocalAutoCompleteStoreContext.Provider>
}

export { LocalAutoCompleteStoreContext, LocalAutoCompleteStoreProvider }
