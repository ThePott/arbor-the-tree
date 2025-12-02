import { type ReactNode } from "react"
import useDropdownContext from "./_useDropdownContext"

const DropdownMenuItem = ({ children, value }: { children: ReactNode; value: string }) => {
    const { setIsOn, setSelectedMenuValue } = useDropdownContext()
    const handleClick = () => {
        setSelectedMenuValue(value)
        setIsOn(false)
    }

    return <div onClick={handleClick}>{children}</div>
}

export default DropdownMenuItem
