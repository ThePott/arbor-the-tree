import type { Tab } from "@/packages/components/TabBar/TabBar"
import type { BWTopicStep } from "./_bookWriteInterfaces"

export interface BookWriteStoreState {
    title: string
    setTitle: (title: string) => void

    selectedTab: Tab<BWTopicStep>
    setSelectedTab: (selectedTab: Tab<BWTopicStep>) => void

    topicInfo: string
    setTopicInfo: (topicInfo: string) => void
    stepInfo: string
    setStepInfo: (stepInfo: string) => void
}
