import { useContext } from "react"
import LabeledContext from "./LabeledContext"

const useLabeledContext = () => {
    const context = useContext(LabeledContext)

    if (!context) {
        throw new Error("---- 콘텍스트가 없어요!")
    }

    return context
}

export default useLabeledContext
