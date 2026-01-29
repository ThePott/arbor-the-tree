import { Hstack } from "@/packages/components/layouts"
import ProgressColumnSection from "./ProgressColumnSection"
import ProgressSidebarSection from "./ProgressSidebarSection"
import ProgressSyllabusDeleteWarningModal from "./ProgressSyllabusDeleteWarningModal"

const ProgressPage = () => {
    return (
        <>
            <Hstack className="h-full" gap="none">
                <ProgressSidebarSection />
                <ProgressColumnSection />
            </Hstack>
            <ProgressSyllabusDeleteWarningModal />
        </>
    )
}

export default ProgressPage
