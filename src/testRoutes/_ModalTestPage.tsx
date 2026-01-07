import Button from "@/packages/components/Button/Button"
import { Container, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Modal from "@/packages/Modal"
import type { DivProps } from "@/shared/interfaces"
import { useState } from "react"

const InnerBox = () => {
    return <div className="p-my-xl bg-amber-600">this is inner box</div>
}

const OuterBox = (props: DivProps) => {
    const { className: _, ...rest } = props
    return <div {...rest} className="p-my-lg pointer-events-none bg-blue-800" />
}

const ModalTestPage = () => {
    const [isFirstModalOn, setIsFirstModalOn] = useState(false)
    const [isSecondModalOn, setIsSecondModalOn] = useState(false)

    return (
        <>
            <Container isPadded>
                <OuterBox>
                    <InnerBox />
                </OuterBox>
                <RoundBox isBordered padding="xl">
                    <Vstack>
                        <p>this is some text</p>
                        <Button onClick={() => setIsFirstModalOn(true)}>open first modal</Button>
                        <Button onClick={() => setIsSecondModalOn(true)}>open second modal</Button>
                    </Vstack>
                </RoundBox>
            </Container>
            <Modal isOn={isFirstModalOn} onBackdropClick={() => setIsFirstModalOn(false)}>
                <Modal.Title>this is modal title</Modal.Title>
                <Modal.Body>this is first modal content</Modal.Body>
                <Modal.ButtonSection>
                    <Modal.Button onClick={() => {}} role="destruct">
                        destruct
                    </Modal.Button>
                </Modal.ButtonSection>
            </Modal>
            <Modal isOn={isSecondModalOn} onBackdropClick={() => setIsSecondModalOn(false)}>
                this is second modal content
            </Modal>
        </>
    )
}

export default ModalTestPage
