import Button from "@/packages/components/Button/Button"
import { Hstack } from "@/packages/components/layouts"
import TabBar, { type Tab } from "@/packages/components/TabBar/TabBar"
import Toggle from "@/packages/components/Toggle"
import type { ReviewCheckStatus } from "@/shared/interfaces"
import useReviewCheckStore from "../../store"

type TabValue = "correct" | "wrong" | "dismiss"
const tabValueToStatus: Record<TabValue, ReviewCheckStatus | null> = {
    correct: "CORRECT",
    wrong: "WRONG",
    dismiss: null,
} as const

const ReviewCheckCreateToolbar = () => {
    const setStatus = useReviewCheckStore((state) => state.setStatus)
    const isMultiSelecting = useReviewCheckStore((state) => state.isMultiSelecting)
    const setIsMultiSelecting = useReviewCheckStore((state) => state.setIsMultiSelecting)
    const changedReviewChecksByMultiSelect = useReviewCheckStore((state) => state.changedIdToRequestInfoByMultiSelect)
    const setChangedIdToRequestInfoByMultiSelect = useReviewCheckStore(
        (state) => state.setChangedIdToRequestInfoByMultiSelect
    )
    const applyChangedReviewChecksFromMultiSelect = useReviewCheckStore(
        (state) => state.applyChangedReviewChecksFromMultiSelect
    )

    const isButtonHighlighted = Object.entries(changedReviewChecksByMultiSelect).length > 0

    const tabArray: Tab<TabValue>[] = [
        { label: "정답", value: "correct" },
        { label: "복습", value: "wrong" },
        { label: "해제", value: "dismiss" },
    ]

    const handleClick = () => {
        applyChangedReviewChecksFromMultiSelect()
        setChangedIdToRequestInfoByMultiSelect({})
    }

    return (
        <Hstack className="p-my-md border-b border-b-border-dim justify-between">
            <Hstack className="items-center" gap="lg">
                <TabBar onSelect={(tab) => setStatus(tabValueToStatus[tab.value])} tabArray={tabArray} variant="pill" />

                <Toggle defaultIsOn={isMultiSelecting} onChange={(isOn) => setIsMultiSelecting(isOn)} isBordered>
                    다중 선택
                </Toggle>
            </Hstack>
            <Button color={isButtonHighlighted ? "bg2" : "transparent"} border="always" onClick={handleClick}>
                제출
            </Button>
        </Hstack>
    )
}

export default ReviewCheckCreateToolbar
