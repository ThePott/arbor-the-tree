import Button from "@/packages/components/Button/Button"
import { Hstack } from "@/packages/components/layouts"
import Toggle from "@/packages/components/Toggle"
import useReviewCheckCreateStore from "../../store"

const ReviewCheckCreateToolbar = () => {
    const status = useReviewCheckCreateStore((state) => state.status)
    const setStatus = useReviewCheckCreateStore((state) => state.setStatus)
    const isMultiSelecting = useReviewCheckCreateStore((state) => state.isMultiSelecting)
    const setIsMultiSelecting = useReviewCheckCreateStore((state) => state.setIsMultiSelecting)
    const changedReviewChecks = useReviewCheckCreateStore((state) => state.changedIdToRequestInfo)
    const changedReviewChecksByMultiSelect = useReviewCheckCreateStore(
        (state) => state.changedIdToRequestInfoByMultiSelect
    )

    const isStagedChanges =
        Object.entries(changedReviewChecks).length > 0 || Object.entries(changedReviewChecksByMultiSelect).length > 0

    return (
        <Hstack className="p-my-md border-b border-b-border-dim justify-between">
            <Hstack>
                <Button onClick={() => setStatus("CORRECT")}>정답</Button>
                <Button onClick={() => setStatus("WRONG")}>복습</Button>
                <Button onClick={() => setStatus(null)}>해제</Button>
                <p>{`selected: ${status}`}</p>

                <Toggle defaultIsOn={isMultiSelecting} onChange={(isOn) => setIsMultiSelecting(isOn)}>
                    다중 선택
                </Toggle>
            </Hstack>
            <Button color={isStagedChanges ? "green" : "transparent"} border="always">
                제출
            </Button>
        </Hstack>
    )
}

export default ReviewCheckCreateToolbar
