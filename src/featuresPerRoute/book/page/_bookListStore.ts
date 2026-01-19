import { debugStore } from "@/shared/config/debug/debug"
import { create } from "zustand"
import { BOOK_LIST_TAB_ARRAY } from "./_bookArrayConstant"
import type { BookListStoreState } from "./_bookListStoreState"

const useBookListStore = create<BookListStoreState>()((set) => ({
    selectedTab: BOOK_LIST_TAB_ARRAY[0],
    setSelectedTab: (selectedTab) => {
        debugStore("BookListStore:setSelectedTab %o", selectedTab)
        set({ selectedTab })
    },

    bookArray: [],
    setBookArray: (bookArray) => {
        debugStore("BookListStore:setBookArray %o", bookArray)
        set({ bookArray })
    },

    isPending: true,
    setIsPending: (isPending) => {
        debugStore("BookListStore:setIsPending %o", isPending)
        set({ isPending })
    },

    modalKey: null,
    setModalKey: (modalKey) => {
        debugStore("BookListStore:setModalKey %o", modalKey)
        set({ modalKey })
    },

    selectedBook: null,
    setSelectedBook: (selectedBook) => {
        debugStore("BookListStore:setSelectedBook %o", selectedBook)
        set({ selectedBook })
    },
}))

export default useBookListStore
