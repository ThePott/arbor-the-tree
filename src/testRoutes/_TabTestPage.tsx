import { Container } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import TabBar from "@/packages/components/Tab/Tab"
import { useState } from "react"

const tabArray = ["something", "st", "something very long"]

const TabTestPage = () => {
    const [selectedLabel, setSelectedLabel] = useState("something")

    return (
        <Container width="lg" isPadded>
            <RoundBox padding="xl" isBordered>
                <div>Tab Test Page</div>
                <div>{selectedLabel}</div>
                <TabBar variant="underline" tabArray={tabArray} onSelect={(tab) => setSelectedLabel(tab)} />
            </RoundBox>
        </Container>
    )
}

export default TabTestPage
