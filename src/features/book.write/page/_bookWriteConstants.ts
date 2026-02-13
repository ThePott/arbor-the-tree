import type { Tab } from "@/packages/components/TabBar/TabBar"
import type { BWTopicStep } from "./_bookWriteInterfaces"

export const BW_TOPIC_STEP_TAB_ARRAY: Tab<BWTopicStep>[] = [
    { value: "topic", label: "중단원" },
    { value: "step", label: "소단원" },
] as const

export const BW_DEFAULT_ROW_COUNT = 2000 as const
