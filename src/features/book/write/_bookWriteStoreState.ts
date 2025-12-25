import type { Tab } from "@/packages/components/TabBar/TabBar"
import type { BookDetail, BWTopicStep } from "./_bookWriteInterfaces"

export interface BookWriteStoreState {
    title: string
    setTitle: (title: string) => void

    selectedTab: Tab<BWTopicStep>
    setSelectedTab: (selectedTab: Tab<BWTopicStep>) => void

    topicInfo: string
    setTopicInfo: (topicInfo: string) => void
    stepInfo: string
    setStepInfo: (stepInfo: string) => void

    subBookTitle: string | null
    setSubBookTitle: (subBookTitle: string | null) => void

    tableData: BookDetail[]
    updateTableData: (rowIndex: number, columnId: keyof BookDetail, value: string) => void
}
