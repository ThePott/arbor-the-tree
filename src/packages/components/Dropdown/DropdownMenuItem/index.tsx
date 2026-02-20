import { type ReactNode } from "react"
import Button from "../../Button/Button"
import useDropdownStore from "../useDropdownStore"

type DropdownMenuItemProps = {
    children: ReactNode
    onClick: () => void
}
const DropdownMenuItem = ({ children, onClick }: DropdownMenuItemProps) => {
    const setIsOn = useDropdownStore((state) => state.setIsOn)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation()
        setIsOn(false)
        onClick()
    }

    return (
        <Button isOnLeft color="transparent" border="onHover" onClick={handleClick}>
            {children}
        </Button>
    )
}

export default DropdownMenuItem
