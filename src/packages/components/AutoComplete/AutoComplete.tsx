import { type ReactNode } from "react"
import AutoCompleteStoreProvider, { type AutoCompleteInitialValue } from "./_AutoCompleteContextProvider"
import AutoCompleteInput from "./_AutoCompleteInput"
import AutoCompleteContent from "./_AutoCompleteContent"
import AutoCompleteOption from "./_AutoCompleteItem"

const AutoComplete = (initialValues: AutoCompleteInitialValue) => {
    return (
        <AutoCompleteStoreProvider {...initialValues}>
            <div className="relative">
                <AutoCompleteInput />
                <AutoCompleteContent />
            </div>
        </AutoCompleteStoreProvider>
    )
}

AutoComplete.Input = AutoCompleteInput
AutoComplete.Content = AutoCompleteContent
AutoComplete.Option = AutoCompleteOption

export default AutoComplete
