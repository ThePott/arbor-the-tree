import { ClientError } from "@/shared/error/clientError"
import { createContext, useContext, type ReactNode } from "react"

const makeComponentContext = <T,>() => {
    const ComponentContext = createContext<T | null>(null)

    const useComponentContext = () => {
        const context = useContext(ComponentContext)
        if (!context) throw ClientError.Unexpected("콘텍스트가 없어요!")
        return context
    }

    type ComponentContextProviderProps = {
        value: T
        children: ReactNode
    }
    const ComponentContextProvider = ({ value, children }: ComponentContextProviderProps) => {
        return <ComponentContext.Provider value={value}>{children}</ComponentContext.Provider>
    }

    return { useComponentContext, ComponentContextProvider }
}

export default makeComponentContext
