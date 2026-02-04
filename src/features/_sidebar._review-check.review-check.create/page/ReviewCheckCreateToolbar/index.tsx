import Button from "@/packages/components/Button/Button"
import { Hstack } from "@/packages/components/layouts"
import Toggle from "@/packages/components/Toggle"
import useReviewCheckCreateStore from "../../store"

const ReviewCheckCreateToolbar = () => {
    const status = useReviewCheckCreateStore((state) => state.status)
    const setStatus = useReviewCheckCreateStore((state) => state.setStatus)

    return (
        <Hstack className="p-my-md border-b border-b-border-dim justify-between">
            <Hstack>
                <Button onClick={() => setStatus("CORRECT")}>정답</Button>
                <Button onClick={() => setStatus("WRONG")}>복습</Button>
                <Button onClick={() => setStatus(null)}>해제</Button>
                <p>{`selected: ${status}`}</p>

                <Toggle onChange={() => {}}>다중 선택</Toggle>
            </Hstack>
            <Button>제출</Button>
        </Hstack>
    )
}

export default ReviewCheckCreateToolbar
