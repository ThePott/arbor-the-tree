import AutoCompleteStoreProvider, { type AutoCompleteInitialValue } from "./_AutoCompleteContextProvider"
import AutoCompleteInput from "./_AutoCompleteInput"
import AutoCompleteContent from "./_AutoCompleteContent"

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

export default AutoComplete
