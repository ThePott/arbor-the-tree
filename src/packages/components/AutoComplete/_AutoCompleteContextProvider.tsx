import { type ReactNode, type RefObject, useCallback, useRef, useState } from "react"
import { createStore, type StoreApi } from "zustand"
import { StoreContext } from "./_autoCompleteHooks"

export type AutoCompleteAvailable = "onlyNew" | "onlyExisting" | "any"

export interface AutoCompleteInitialValue {
    onValueChange: (value: string, isError: boolean) => void
    onErrorChange?: (isError: boolean) => void
    getOptionArray: (searchText: string) => void
    available: AutoCompleteAvailable
    queryKey: string[]
    defaultValue?: string
    variant?: "contained" | "ghost"
    colorChangeIn?: "line" | "fill"
}

interface AutoCompleteStoreStateBase {
    inputRef: RefObject<HTMLInputElement | null>

    isContentOn: boolean
    setIsContentOn: (isFocused: boolean) => void

    isRed: boolean
    setIsRed: (isRed: boolean) => void

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

    const createAutoCompleteStore = useCallback(
        () =>
            createStore<AutoCompleteStoreState>((set) => ({
                inputRef,

                isContentOn: false,
                setIsContentOn: (isContentOn) => set({ isContentOn }),

                isRed: false,
                setIsRed: (isRed: boolean) => set({ isRed }),

                inputValue: "",
                setInputValue: (inputValue: string) => set({ inputValue }),

                optionArray: [],
                setOptionArray: (schoolNameArray) => set({ optionArray: schoolNameArray }),

                ...initialValues,
            })),
        [initialValues]
    )
    const [store, _setStore] = useState<StoreApi<AutoCompleteStoreState>>(createAutoCompleteStore)
    return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export default AutoCompleteStoreProvider
