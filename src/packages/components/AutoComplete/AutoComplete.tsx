import AutoCompleteStoreProvider, { type AutoCompleteInitialValue } from "./_AutoCompleteContextProvider"
import AutoCompleteInput from "./_AutoCompleteInput"
import AutoCompleteContent from "./_AutoCompleteContent"

interface WithAutoCompleteProps {
    outerIsRed: boolean
}

const AutoComplete = ({ outerIsRed, ...initialValues }: AutoCompleteInitialValue & WithAutoCompleteProps) => {
    return (
        <AutoCompleteStoreProvider {...initialValues}>
            <div className="relative">
                <AutoCompleteInput outerIsRed={outerIsRed} />
                <AutoCompleteContent />
            </div>
        </AutoCompleteStoreProvider>
    )
}

export default AutoComplete
