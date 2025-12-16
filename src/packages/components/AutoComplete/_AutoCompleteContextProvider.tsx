import { type ReactNode, useState } from "react"
import { createStore, type StoreApi } from "zustand"
import { StoreContext } from "./_autoCompleteHooks"

type AutoCompleteStatus = "normal" | "danger" | "create"

export interface AutoCompleteInitialValue {
    getOptionArray: (searchText: string) => void
    isNewOptionAvailable: boolean
}

interface AutoCompleteStoreStateBase {
    isFocused: boolean
    setIsFocused: (isFocused: boolean) => void

    status: AutoCompleteStatus
    setStatus: (status: AutoCompleteStatus) => void

    selectedOption: string | null
    setSelectedOption: (selectedOption: string) => void

    inputValue: string
    setInputValue: (inputValue: string) => void

    optionArray: string[]
    setOptionArray: (optionArray: string[]) => void
}

export type AutoCompleteStoreState = AutoCompleteStoreStateBase & AutoCompleteInitialValue

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

        selectedOption: null,
        setSelectedOption: (selectedOption: string) => set({ selectedOption }),

        inputValue: "",
        setInputValue: (inputValue: string) => set({ inputValue }),

        optionArray: [],
        setOptionArray: (schoolNameArray) => set({ optionArray: schoolNameArray }),

        ...initialValues,
    }))
    const [store, _setStore] = useState<StoreApi<AutoCompleteStoreState>>(autoCompleteStore)
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export default AutoCompleteStoreProvider
