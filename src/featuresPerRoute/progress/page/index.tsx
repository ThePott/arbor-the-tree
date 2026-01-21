import { Hstack } from "@/packages/components/layouts"
import ProgressColumnSection from "./ProgressColumnSection"

const ProgressPage = () => {
    return (
        <Hstack className="h-full" gap="none">
            <div className="border-r border-r-border-dim p-my-lg w-[300px]">this is sidebar</div>
            <ProgressColumnSection />
        </Hstack>
    )
}

export default ProgressPage
