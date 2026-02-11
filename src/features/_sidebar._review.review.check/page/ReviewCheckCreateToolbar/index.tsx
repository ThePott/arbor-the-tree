import Button from "@/packages/components/Button/Button"
import { Hstack } from "@/packages/components/layouts"
import TabBar, { type Tab } from "@/packages/components/TabBar/TabBar"
import Toggle from "@/packages/components/Toggle"
import type { ReviewCheckStatus } from "@/shared/interfaces"
import useReviewCheckCreateStore from "../../store"

type TabValue = "correct" | "wrong" | "dismiss"
const tabValueToStatus: Record<TabValue, ReviewCheckStatus | null> = {
    correct: "CORRECT",
    wrong: "WRONG",
    dismiss: null,
} as const

const ReviewCheckCreateToolbar = () => {
    const setStatus = useReviewCheckCreateStore((state) => state.setStatus)
    const isMultiSelecting = useReviewCheckCreateStore((state) => state.isMultiSelecting)
    const setIsMultiSelecting = useReviewCheckCreateStore((state) => state.setIsMultiSelecting)
    const changedReviewChecks = useReviewCheckCreateStore((state) => state.changedIdToRequestInfo)
    const changedReviewChecksByMultiSelect = useReviewCheckCreateStore(
        (state) => state.changedIdToRequestInfoByMultiSelect
    )

    const isStagedChanges =
        Object.entries(changedReviewChecks).length > 0 || Object.entries(changedReviewChecksByMultiSelect).length > 0

    const tabArray: Tab<TabValue>[] = [
        { label: "정답", value: "correct" },
        { label: "복습", value: "wrong" },
        { label: "해제", value: "dismiss" },
    ]

    return (
        <Hstack className="p-my-md border-b border-b-border-dim justify-between">
            <Hstack className="items-center" gap="lg">
                <TabBar onSelect={(tab) => setStatus(tabValueToStatus[tab.value])} tabArray={tabArray} variant="pill" />

                <Toggle defaultIsOn={isMultiSelecting} onChange={(isOn) => setIsMultiSelecting(isOn)} isBordered>
                    다중 선택
                </Toggle>
            </Hstack>
            <Button color={isStagedChanges ? "bg2" : "transparent"} border="always">
                제출
            </Button>
        </Hstack>
    )
}

export default ReviewCheckCreateToolbar
