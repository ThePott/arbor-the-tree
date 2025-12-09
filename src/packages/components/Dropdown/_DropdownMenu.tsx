import { useEffect, type ReactNode } from "react"
import useDropdownContext from "./_useDropdownContext"
import DropdownContent from "./_DropdownContent"
import RoundBox from "../RoundBox"
import { Vstack } from "../layouts"

interface DropdownMenuInterface {
    onChange: (value: string) => void
    children: ReactNode
}

const DropdownMenu = ({ children, onChange }: DropdownMenuInterface) => {
    const { selectedMenuValue } = useDropdownContext()

    useEffect(() => {
        if (!selectedMenuValue) {
            return
        }
        onChange(selectedMenuValue)
    }, [selectedMenuValue, onChange])

    return (
        <DropdownContent>
            <RoundBox radius="md" color="bg3" padding="lg" isShadowed className="text-my-sm blur-drop-sm">
                <Vstack>{children}</Vstack>
            </RoundBox>
        </DropdownContent>
    )
}

export default DropdownMenu
