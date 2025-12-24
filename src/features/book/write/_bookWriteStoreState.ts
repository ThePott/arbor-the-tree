import type { Tab } from "@/packages/components/TabBar/TabBar"
import type { BWTopicStep } from "./_bookWriteInterfaces"
import type { Book } from "@/shared/interfaces"

export interface BookWriteStoreState {
    title: string
    setTitle: (title: string) => void

    selectedTab: Tab<BWTopicStep>
    setSelectedTab: (selectedTab: Tab<BWTopicStep>) => void

    topicInfo: string
    setTopicInfo: (topicInfo: string) => void
    stepInfo: string
    setStepInfo: (stepInfo: string) => void

    bookArray: Book[]
    setBookArray: (bookArray: Book[]) => void
    isPending: boolean
    setIsPending: (isPending: boolean) => void
}
