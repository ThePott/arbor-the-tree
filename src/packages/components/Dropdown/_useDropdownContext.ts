import { useContext } from "react"
import DropdownContext from "./_DropdownContext"

const useDropdownContext = () => {
    const context = useContext(DropdownContext)
    if (!context) {
        throw new Error("---- 콘텍스트가 없어요")
    }

    return context
}

export default useDropdownContext
