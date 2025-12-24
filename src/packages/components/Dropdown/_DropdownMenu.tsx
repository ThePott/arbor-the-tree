import { useEffect, type ReactNode } from "react"
import useDropdownContext from "./_useDropdownContext"
import DropdownContent from "./_DropdownContent"
import RoundBox from "../RoundBox"
import { Vstack } from "../layouts"
import type { DropdownDirection } from "./_dropdownInterfaces"

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
            <RoundBox radius="md" color="bg3" padding="lg" isShadowed className="text-my-sm">
                <Vstack>{children}</Vstack>
            </RoundBox>
        </DropdownContent>
    )
}

export default DropdownMenu
