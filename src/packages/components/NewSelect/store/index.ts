import createLocalStore from "@/packages/store/createLocalStore"
import type { RefObject } from "react"
import type { StateCreator } from "zustand"
import type { NewSelectPassedProps } from ".."

type NewSelectDefaultProps<T extends string | number> = {
    isOpened: boolean
    setIsOpened: (isOpened: boolean) => void
    selectedValue: T | null
    setSelectedValue: (selectedValue: T | null) => void
}
const createSelectStore = <T extends string | number>(
    defaultInitializer: StateCreator<NewSelectDefaultProps<T>, [], [], NewSelectDefaultProps<T>>
) => {
    const { LocalStoreProvider: SelectStoreProvider, useLocalStore: useSelectStore } = createLocalStore<
        NewSelectPassedProps<T> & { triggerRef: RefObject<HTMLButtonElement | null> },
        NewSelectDefaultProps<T>
    >(defaultInitializer)

    return { SelectStoreProvider, useSelectStore }
}

const { SelectStoreProvider, useSelectStore } = createSelectStore((set) => ({
    isOpened: false,
    setIsOpened: (isOpened) => set({ isOpened }),
    selectedValue: null,
    setSelectedValue: (selectedLabel) => set({ selectedValue: selectedLabel }),
}))

export { SelectStoreProvider, useSelectStore }
