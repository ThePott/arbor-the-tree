import { createContext, useContext, useEffect } from "react"
import { useStore, type StoreApi } from "zustand"
import { useQuery } from "@tanstack/react-query"
import type { AutoCompleteStoreState } from "./_AutoCompleteContextProvider"

export const StoreContext = createContext<StoreApi<AutoCompleteStoreState> | null>(null)

export const useAutoCompleteStore = <T>(selectorFn: (state: AutoCompleteStoreState) => T) => {
    const store = useContext(StoreContext)
    if (!store) {
        throw new Error("---- 콘텍스트가 없어요!")
    }

    return useStore(store, selectorFn)
}

export const useAutoCompleteQuery = (debouncedValue: string) => {
    const setOptionArray = useAutoCompleteStore((state) => state.setOptionArray)
    const getOptionArray = useAutoCompleteStore((state) => state.getOptionArray)
    const isContentOn = useAutoCompleteStore((state) => state.isContentOn)

    const { data, isFetching, error } = useQuery({
        queryKey: ["auto-complete", debouncedValue],
        queryFn: () => getOptionArray(debouncedValue),
    })

    useEffect(() => {
        if (!data) {
            return
        }

        setOptionArray(data)
    }, [data])

    return { isPending: isFetching && isContentOn, error }
}
