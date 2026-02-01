import { type ReactNode } from "react"
import useDropdownContext from "./_useDropdownContext"

const DropdonwTrigger = ({ children }: { children: ReactNode }) => {
    const { setIsOn, triggerRef } = useDropdownContext()
    const handleClick = () => {
        setIsOn((prev) => !prev)
    }
    return (
        <div ref={triggerRef} onClick={handleClick}>
            {children}
        </div>
    )
}

export default DropdonwTrigger
