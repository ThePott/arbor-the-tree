import { type ReactNode } from "react"
import useDropdownContext from "./_useDropdownContext"
import { Hstack } from "../layouts"

const DropdownMenuItem = ({ children, value }: { children: ReactNode; value: string }) => {
    const { setIsOn, setSelectedMenuValue } = useDropdownContext()
    const handleClick = () => {
        setSelectedMenuValue(value)
        setIsOn(false)
    }

    return (
        <Hstack
            onClick={handleClick}
            className="py-oz-md px-oz-lg border-b border-gray-200 last:border-b-0 hover:bg-gray-50 active:bg-gray-100"
        >
            {children}
        </Hstack>
    )
}

export default DropdownMenuItem
