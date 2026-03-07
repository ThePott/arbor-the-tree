import createLocalStore from "@/packages/store/createLocalStore"
import type { RefObject } from "react"
import type { StateCreator } from "zustand"
import type { NewSelectPassedProps } from ".."

type NewSelectDefaultProps = {
    isOpened: boolean
    setIsOpened: (isOpened: boolean) => void
    selectedLabel: string | null
    setSelectedLabel: (selectedLabel: string | null) => void
}
const createSelectStore = <T extends string | number>(
    defaultInitializer: StateCreator<NewSelectDefaultProps, [], [], NewSelectDefaultProps>
) => {
    const { LocalStoreProvider: SelectStoreProvider, useLocalStore: useSelectStore } = createLocalStore<
        NewSelectPassedProps<T> & { triggerRef: RefObject<HTMLButtonElement | null> },
        NewSelectDefaultProps
    >(defaultInitializer)

    return { SelectStoreProvider, useSelectStore }
}

const { SelectStoreProvider, useSelectStore } = createSelectStore((set) => ({
    isOpened: false,
    setIsOpened: (isOpened) => set({ isOpened }),
    selectedLabel: null,
    setSelectedLabel: (selectedLabel) => set({ selectedLabel }),
}))

export { SelectStoreProvider, useSelectStore }
