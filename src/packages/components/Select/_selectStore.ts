import createLocalStore from "@/packages/store/createLocalStore"
import type { RefObject } from "react"
import type { WithSelectProps } from "./Select"

export type SelectPassedProps = WithSelectProps & {
    triggerRef: RefObject<HTMLButtonElement | null>
}

interface SelectDefaultProps {
    isOpened: boolean
    setIsOpened: (isOpened: boolean) => void
    toggleIsOpened: () => void
    selectedValue: string | number | null
    setSelectedValue: (value: string | number | null) => void
    selectedLabel: string | null
    setSelectedLabel: (label: string | null) => void
}

const { LocalStoreProvider: SelectProvider, useLocalStore: useSelectStore } = createLocalStore<
    SelectPassedProps,
    SelectDefaultProps
>((set, get) => ({
    isOpened: false,
    setIsOpened: (isOpened) => set({ isOpened }),
    toggleIsOpened: () => set({ isOpened: !get().isOpened }),
    selectedValue: null,
    setSelectedValue: (selectedValue) => set({ selectedValue }),
    selectedLabel: null,
    setSelectedLabel: (selectedLabel) => set({ selectedLabel }),
}))

export { SelectProvider, useSelectStore }
