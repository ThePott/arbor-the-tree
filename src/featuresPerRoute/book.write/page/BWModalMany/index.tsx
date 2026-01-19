import { debugRender } from "@/shared/config/debug/debug"
import BWErrorModal from "./_BWErrorModal"
import BWSuccessModal from "./_BWSuccessModal"

const BWModalMany = () => {
    debugRender("BWModalMany")
    return (
        <>
            <BWSuccessModal />
            <BWErrorModal />
        </>
    )
}

export default BWModalMany
