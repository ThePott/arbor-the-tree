import type { Tab } from "@/packages/components/TabBar/TabBar"
import type { BookActivity, BookListModalKey } from "./_bookListInterfaces"
import type { Book } from "@/shared/interfaces"

export interface BookListStoreState {
    selectedTab: Tab<BookActivity>
    setSelectedTab: (selectedTab: Tab<BookActivity>) => void

    bookArray: Book[]
    setBookArray: (bookArray: Book[]) => void

    isPending: boolean
    setIsPending: (isPending: boolean) => void

    modalKey: BookListModalKey | null
    setModalKey: (modalKey: BookListModalKey | null) => void

    selectedBook: Book | null
    setSelectedBook: (selectedBook: Book | null) => void
}
