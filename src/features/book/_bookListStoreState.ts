import type { Tab } from "@/packages/components/TabBar/TabBar"
import type { BookActivity } from "./_bookListInterfaces"
import type { Book } from "@/shared/interfaces"

export interface BookListStoreState {
    selectedTab: Tab<BookActivity>
    setSelectedTab: (selectedTab: Tab<BookActivity>) => void

    bookArray: Book[]
    setBookArray: (bookArray: Book[]) => void

    isPending: boolean
    setIsPending: (isPending: boolean) => void
}
