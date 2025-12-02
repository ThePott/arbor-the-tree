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
            className="py-oz-md px-oz-lg border-b-border-dim hover:bg-bg-3 active:bg-washed-black shrink-0 border-b last:border-b-0"
        >
            {children}
        </Hstack>
    )
}

export default DropdownMenuItem
