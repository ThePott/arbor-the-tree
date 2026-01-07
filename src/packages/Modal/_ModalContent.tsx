import type { SmToLg } from "@/shared/interfaces"
import type { ReactNode } from "react"
import { Container } from "../components/layouts"

export type ModalContentProps = {
    width?: SmToLg
    children: ReactNode
}

const ModalContent = ({ width, children }: ModalContentProps) => {
    return (
        <Container width={width} isPadded onClick={(event) => event.stopPropagation()}>
            {children}
        </Container>
    )
}

export default ModalContent
