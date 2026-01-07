import type { SmToLg } from "@/shared/interfaces"
import type { ReactNode } from "react"
import { Container, Vstack } from "../components/layouts"
import RoundBox from "../components/RoundBox"

export type ModalContentProps = {
    width?: SmToLg
    children: ReactNode
}

const ModalContent = ({ width, children }: ModalContentProps) => {
    return (
        <Container width={width} onClick={(event) => event.stopPropagation()}>
            <RoundBox color="bg3" padding="xl" radius="lg" isShadowed>
                <Vstack>{children}</Vstack>
            </RoundBox>
        </Container>
    )
}

export default ModalContent
