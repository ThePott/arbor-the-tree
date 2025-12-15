import { type ReactNode } from "react"
import AutoCompleteStoreProvider from "./_AutoCompleteContextProvider"
import AutoCompleteInput from "./_AutoCompleteInput"
import AutoCompleteContent from "./_AutoCompleteContent"
import AutoCompleteOption from "./_AutoCompleteItem"

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

AutoComplete.Input = AutoCompleteInput
AutoComplete.Content = AutoCompleteContent
AutoComplete.Option = AutoCompleteOption

export default AutoComplete
