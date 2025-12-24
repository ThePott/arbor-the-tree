import { create } from "zustand"
import type { BookWriteStoreState } from "./_bookWriteStoreState"

const useBookWriteStore = create<BookWriteStoreState>()((set) => ({
    title: "",
    setTitle: (title) => set({ title }),
}))

export default useBookWriteStore
