import { type ReactNode, type RefObject, useRef, useState } from "react"
import { createStore, type StoreApi } from "zustand"
import { StoreContext } from "./_autoCompleteHooks"

type AutoCompleteStatus = "normal" | "danger" | "create"

export interface AutoCompleteInitialValue {
    getOptionArray: (searchText: string) => void
    isNewOptionAvailable: boolean
}

interface AutoCompleteStoreStateBase {
    inputRef: RefObject<HTMLInputElement | null>

    isContentOn: boolean
    setIsContentOn: (isFocused: boolean) => void

    status: AutoCompleteStatus
    setStatus: (status: AutoCompleteStatus) => void

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
    const inputRef = useRef<HTMLInputElement>(null)

    const autoCompleteStore = createStore<AutoCompleteStoreState>((set) => ({
        inputRef,

        isContentOn: false,
        setIsContentOn: (isContentOn) => set({ isContentOn }),

        status: "normal",
        setStatus: (status: AutoCompleteStatus) => set({ status }),

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
