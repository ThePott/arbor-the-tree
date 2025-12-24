import { create } from "zustand"
import type { BookListStoreState } from "./_bookListStoreState"
import { BOOK_LIST_TAB_ARRAY } from "./_bookArrayConstant"

const useBookListStore = create<BookListStoreState>()((set) => ({
    selectedTab: BOOK_LIST_TAB_ARRAY[0],
    setSelectedTab: (selectedTab) => set({ selectedTab }),

    bookArray: [],
    setBookArray: (bookArray) => set({ bookArray }),

    isPending: true,
    setIsPending: (isPending) => set({ isPending }),
}))

export default useBookListStore
