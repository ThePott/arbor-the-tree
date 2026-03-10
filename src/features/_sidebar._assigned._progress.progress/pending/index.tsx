import { Hstack, Vstack } from "@/packages/components/layouts"
import Skeleton from "@/packages/components/Skeleton"

const ProgressPending = () => {
    return (
        <Vstack gap="none" className="h-full">
            <Skeleton heightInPixel={24} widthInPixel={74} />
            <Hstack className="flex-1 overflow-y-hidden pb-my-lg">
                <Skeleton widthInPixel={300} className="shrink-0" />
                <Skeleton widthInPixel={300} className="shrink-0" />
                <Skeleton widthInPixel={300} className="shrink-0" />
            </Hstack>
        </Vstack>
    )
}

export default ProgressPending
