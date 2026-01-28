import { useEffect, type ReactNode } from "react"
import RoundBox from "../RoundBox"
import { Vstack } from "../layouts"
import DropdownContent from "./_DropdownContent"
import type { DropdownDirection } from "./_dropdownInterfaces"
import useDropdownContext from "./_useDropdownContext"

interface DropdownMenuInterface {
    onChange: (value: string) => void
    children: ReactNode
    direction?: DropdownDirection
}

const DropdownMenu = ({ children, onChange, direction = "bottomLeft" }: DropdownMenuInterface) => {
    const { selectedMenuValue } = useDropdownContext()

    useEffect(() => {
        if (!selectedMenuValue) {
            return
        }
        onChange(selectedMenuValue)
    }, [selectedMenuValue])

    return (
        <DropdownContent direction={direction}>
            <RoundBox radius="md" color="bg3" padding="lg" isShadowed className="text-my-sm text-fg-vivid">
                <Vstack>{children}</Vstack>
            </RoundBox>
        </DropdownContent>
    )
}

export default DropdownMenu
