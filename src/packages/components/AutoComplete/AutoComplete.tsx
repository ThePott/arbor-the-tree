import { type ReactNode } from "react"
import AutoCompleteStoreProvider from "./_AutoCompleteContextProvider"

export interface AutoCompleteInitialValue {
    onChange: (value: string) => void
    isNewOptionAvailable: boolean
}

const AutoComplete = ({ children, ...initialValues }: { children: ReactNode } & AutoCompleteInitialValue) => {
    return (
        <AutoCompleteStoreProvider {...initialValues}>
            <div className="relative">{children}</div>
        </AutoCompleteStoreProvider>
    )
}

export default AutoComplete
