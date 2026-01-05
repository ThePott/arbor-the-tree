import type { Tab } from "@/packages/components/TabBar/TabBar"
import type { BookWriteRow, BWTopicStep } from "../_bookWriteInterfaces"

export interface BookWriteStoreState {
    title: string
    setTitle: (title: string) => void
    publishedYear: number | undefined
    setPublishedYear: (publishedYear: number) => void

    selectedTab: Tab<BWTopicStep>
    setSelectedTab: (selectedTab: Tab<BWTopicStep>) => void

    topicArray: string[]
    stepArray: string[]
    topicInfo: string
    setTopicInfo: (topicInfo: string) => void
    stepInfo: string
    setStepInfo: (stepInfo: string) => void

    subBookTitle: string | null
    setSubBookTitle: (subBookTitle: string | null) => void

    rowArray: BookWriteRow[]
    updateRowArray: (rowIndex: number, columnKey: keyof BookWriteRow, value: string) => void
}
