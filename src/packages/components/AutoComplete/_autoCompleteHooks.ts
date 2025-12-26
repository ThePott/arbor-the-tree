import { createContext, useContext, useEffect } from "react"
import { useStore, type StoreApi } from "zustand"
import { useQuery } from "@tanstack/react-query"
import type { AutoCompleteStoreState } from "./_AutoCompleteContextProvider"

export const AutoCompleteStoreContext = createContext<StoreApi<AutoCompleteStoreState> | null>(null)

export const useAutoCompleteStore = <T>(selectorFn: (state: AutoCompleteStoreState) => T) => {
    const store = useContext(AutoCompleteStoreContext)
    if (!store) {
        throw new Error("---- 콘텍스트가 없어요!")
    }

    return useStore(store, selectorFn)
}

export const useAutoCompleteQuery = (debouncedValue: string) => {
    const setOptionArray = useAutoCompleteStore((state) => state.setOptionArray)
    const getOptionArray = useAutoCompleteStore((state) => state.getOptionArray)
    const queryKey = useAutoCompleteStore((state) => state.queryKey)

    const { data, isFetching } = useQuery({
        queryKey: [...queryKey, debouncedValue],
        queryFn: () => getOptionArray(debouncedValue),
    })

    useEffect(() => {
        if (!data) {
            return
        }
        setOptionArray(data)
    }, [data])

    return { isFetching }
}
