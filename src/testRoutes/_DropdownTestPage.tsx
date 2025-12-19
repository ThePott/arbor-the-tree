import Button from "@/packages/components/Button/Button"
import Dropdown from "@/packages/components/Dropdown/Dropdown"
import { Container } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import { useState } from "react"

const SimpleDropdown = () => {
    const [isOn, setIsOn] = useState(false)
    return (
        <div className="relative">
            <Button onClick={() => setIsOn(!isOn)}>Trigger</Button>
            {isOn && (
                <div className="absolute top-full left-0 z-10 bg-amber-300">
                    {Array(10)
                        .fill(0)
                        .map((_, index) => (
                            <p key={index}>some content</p>
                        ))}
                </div>
            )}
        </div>
    )
}

const MyDropdown = () => {
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <Button>누르면 켜짐</Button>
            </Dropdown.Trigger>
            <Dropdown.Menu onChange={() => {}}>
                {Array(10)
                    .fill(0)
                    .map((_, index) => (
                        <Dropdown.MenuItem value={String(index)}>asdf</Dropdown.MenuItem>
                    ))}
            </Dropdown.Menu>
        </Dropdown>
    )
}

const DropdownTestPage = () => {
    return (
        <Container width="md" isPadded>
            <RoundBox isBordered padding="xl">
                <SimpleDropdown />
                <SimpleDropdown />
                <MyDropdown />
                <MyDropdown />
            </RoundBox>
        </Container>
    )
}

export default DropdownTestPage
