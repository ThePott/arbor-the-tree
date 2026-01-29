import { type ReactNode } from "react"
import Button from "../../Button/Button"
import useDropdownStore from "../useDropdownStore"

type DropdownMenuItemProps = {
    children: ReactNode
    onClick: () => void
}
const DropdownMenuItem = ({ children, onClick }: DropdownMenuItemProps) => {
    const setIsOn = useDropdownStore((state) => state.setIsOn)
    const handleClick = () => {
        setIsOn(false)
        onClick()
    }

    return (
        <Button color="bg2" isBorderedOnHover onClick={handleClick}>
            {children}
        </Button>
    )
}

export default DropdownMenuItem
