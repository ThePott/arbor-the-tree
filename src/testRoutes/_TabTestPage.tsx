import { Container } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import { useState } from "react"

const TabTestPage = () => {
    const [selectedLabel, _setSelectedLabel] = useState("something")

    return (
        <Container width="lg" isPadded>
            <RoundBox padding="xl" isBordered>
                <div>Tab Test Page</div>
                <div>{selectedLabel}</div>
            </RoundBox>
        </Container>
    )
}

export default TabTestPage
