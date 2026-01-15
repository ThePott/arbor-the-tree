import { useContext } from "react"
import { useStore } from "zustand"
import { LocalAutoCompleteStoreContext, type LocalAutoCompleteStoreState } from "../LocalAutoCompleteStoreProvider"

const useLocalAutoCompleteStore = <T>(selectorFn: (state: LocalAutoCompleteStoreState) => T) => {
    const store = useContext(LocalAutoCompleteStoreContext)
    if (!store) {
        throw new Error("---- 콘텍스트가 없어요!")
    }

    return useStore(store, selectorFn)
}

export default useLocalAutoCompleteStore
