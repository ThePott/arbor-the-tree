import { createContext } from "react"

interface LabeledContextProps {
    isInDanger: boolean
    isRequired: boolean
}

const LabeledContext = createContext<LabeledContextProps | null>(null)

export default LabeledContext
