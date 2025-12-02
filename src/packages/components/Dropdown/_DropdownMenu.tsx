import { useEffect, type ReactNode } from "react"
import useDropdownContext from "./_useDropdownContext"
import DropdownContent from "./_DropdownContent"
import RoundBox from "../RoundBox"

// TODO: 범용적으로 사용하려면 너비에 관련된 게 있어야 하는데...
const DropdownMenu = ({ children, onChange }: { children: ReactNode; onChange: (value: string) => void }) => {
    const { selectedMenuValue } = useDropdownContext()

    useEffect(() => {
        if (!selectedMenuValue) {
            return
        }
        onChange(selectedMenuValue)
    }, [selectedMenuValue, onChange])

    return (
        <DropdownContent>
            <RoundBox padding="none" radius="md" color="bg3" isShadowed className="text-my-sm p-my-md">
                {children}
            </RoundBox>
        </DropdownContent>
    )
}

export default DropdownMenu
