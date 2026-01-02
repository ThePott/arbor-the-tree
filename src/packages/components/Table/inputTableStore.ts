import createLocalStore from "@/packages/store/createLocalStore"
import type { StateCreator } from "zustand"

export interface InputTablePassedProps<TKey extends string> {
    keyArray: TKey[] // NOTE: column 역할
    rowArray: Record<TKey, string>[] // NOTE: data 역할
    keyToLabel: Record<TKey, string> // NOTE: thead 용
}

interface InputTableDefaultProps {
    dummyDefault: string
    setDummyDefault: (dummyDefault: string) => void
}

const createInputTableStore = <TKey extends string>(
    defaultInitializer: StateCreator<InputTableDefaultProps, [], [], InputTableDefaultProps>
) => {
    const { LocalStoreProvider: InputTableProvider, useLocalStore: useInputTableStore } = createLocalStore<
        InputTablePassedProps<TKey>,
        InputTableDefaultProps
    >(defaultInitializer)

    return { InputTableProvider, useInputTableStore }
}

const { InputTableProvider, useInputTableStore } = createInputTableStore((set) => ({
    dummyDefault: "this is dummy default",
    setDummyDefault: (dummyDefault) => set({ dummyDefault }),
}))

export { InputTableProvider, useInputTableStore }
