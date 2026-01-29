import { useContext } from "react"
import { useStore } from "zustand"
import { DropdownStoreContext, type DropdownStoreState } from "../DropdownStoreProvider"

const useDropdownStore = <T>(selectorFn: (state: DropdownStoreState) => T) => {
    const store = useContext(DropdownStoreContext)
    if (!store) {
        throw new Error("---- 콘텍스트가 없어요!")
    }

    return useStore(store, selectorFn)
}

export default useDropdownStore
