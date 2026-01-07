import Button from "@/packages/components/Button/Button"
import { Container, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Modal from "@/packages/Modal/Modal"
import { useState } from "react"

const ModalTestPage = () => {
    const [isFirstModalOn, setIsFirstModalOn] = useState(false)
    const [isSecondModalOn, setIsSecondModalOn] = useState(false)
    return (
        <>
            <Container isPadded>
                <RoundBox isBordered padding="xl">
                    <Vstack>
                        <p>this is some text</p>
                        <Button onClick={() => setIsFirstModalOn(true)}>open first modal</Button>
                        <Button onClick={() => setIsSecondModalOn(true)}>open second modal</Button>
                    </Vstack>
                </RoundBox>
            </Container>
            <Modal isOn={isFirstModalOn} onBackgroundClick={() => setIsFirstModalOn(false)}>
                this is first modal content
            </Modal>
            <Modal isOn={isSecondModalOn} onBackgroundClick={() => setIsSecondModalOn(false)}>
                this is second modal content
            </Modal>
        </>
    )
}

export default ModalTestPage
