import { Hstack } from "@/packages/components/layouts"
import ProgressColumnSection from "./ProgressColumnSection"
import ProgressSidebarSection from "./ProgressSidebarSection"

const ProgressPage = () => {
    return (
        <Hstack className="h-full" gap="none">
            <ProgressSidebarSection />
            <ProgressColumnSection />
        </Hstack>
    )
}

export default ProgressPage
