import type { Tab } from "@/packages/components/TabBar/TabBar"
import type { BookActivity } from "./_bookListInterfaces"

export const BOOK_LIST_TAB_ARRAY: Tab<BookActivity>[] = [
    { value: "active", label: "사용 중" },
    { value: "inactive", label: "사용 안 함" },
    { value: "total", label: "전체" },
] as const
