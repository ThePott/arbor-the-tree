import Button from "@/packages/components/Button/Button"
import MinimalDropdown from "@/packages/components/DropdownNew"
import { Container } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import { flip, FloatingPortal, shift, useFloating } from "@floating-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"

export const Route = createFileRoute("/test/floating")({
    component: RouteComponent,
})

const TestDropdown = () => {
    const [isOn, setIsOn] = useState(false)

    const { refs, floatingStyles } = useFloating({ placement: "right", middleware: [shift(), flip()] })
    const { setReference, setFloating } = refs

    return (
        <div className="relative">
            <Button ref={setReference} onClick={() => setIsOn(!isOn)}>
                click this
            </Button>
            {isOn && (
                <FloatingPortal>
                    <RoundBox ref={setFloating} style={floatingStyles} padding="xl" color="bg2">
                        this is tooltip
                    </RoundBox>
                </FloatingPortal>
            )}
        </div>
    )
}

const TestingMinimalDropdown = () => {
    return (
        <MinimalDropdown>
            <MinimalDropdown.Trigger>
                <Button>minimal</Button>
            </MinimalDropdown.Trigger>
            <MinimalDropdown.Content>
                <RoundBox color="bg2" padding="xl">
                    this is content
                </RoundBox>
            </MinimalDropdown.Content>
        </MinimalDropdown>
    )
}

function RouteComponent() {
    return (
        <Container isPadded>
            <RoundBox color="bg0" padding="xl" isBordered className="size-100 overflow-scroll flex flex-col items-end">
                <TestingMinimalDropdown />
                <TestDropdown />
                <TestDropdown />
                <TestDropdown />
                <TestDropdown />
                <TestDropdown />
                <TestDropdown />
                <TestDropdown />
                <TestDropdown />
                <TestDropdown />
            </RoundBox>
        </Container>
    )
}
