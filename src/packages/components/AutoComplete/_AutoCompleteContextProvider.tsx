import { type ReactNode, useState } from "react"
import { createStore, type StoreApi } from "zustand"
import { StoreContext } from "./_useAutoCompleteStoreContext"
import type { AutoCompleteInitialValue } from "./AutoComplete"

type AutoCompleteStatus = "normal" | "danger" | "create"

export interface AutoCompleteStoreState {
    onChange: (value: string) => void
    isNewOptionAvailable: boolean

    isFocused: boolean
    setIsFocused: (isFocused: boolean) => void

    status: AutoCompleteStatus
    setStatus: (status: AutoCompleteStatus) => void
}

const AutoCompleteStoreProvider = ({
    children,
    ...initialValues
}: {
    children: ReactNode
} & AutoCompleteInitialValue) => {
    const autoCompleteStore = createStore<AutoCompleteStoreState>((set) => ({
        isFocused: false,
        setIsFocused: (isFocused) => set({ isFocused }),

        status: "normal",
        setStatus: (status: AutoCompleteStatus) => set({ status }),

        ...initialValues,
    }))
    const [store, _setStore] = useState<StoreApi<AutoCompleteStoreState>>(autoCompleteStore)
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export default AutoCompleteStoreProvider
