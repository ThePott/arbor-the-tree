import type { ReactNode } from "react"
import { GridContainer } from "../components/layouts"

const ModalButtonSection = ({ children }: { children: ReactNode }) => {
    return <GridContainer>{children}</GridContainer>
}

export default ModalButtonSection
