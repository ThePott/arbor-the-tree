import { useContext } from "react"
import SelectContext from "./_SelectContext"

const useSelectContext = () => {
    const context = useContext(SelectContext)
    if (!context) {
        throw Error("---- 콘텍스트가 없어요!")
    }
    return context
}

export default useSelectContext
