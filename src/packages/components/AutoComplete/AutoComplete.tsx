import AutoCompleteContent from "./_AutoCompleteContent"
import AutoCompleteStoreProvider, { type AutoCompleteInitialValue } from "./_AutoCompleteContextProvider"
import AutoCompleteInput from "./_AutoCompleteInput"

interface WithAutoCompleteProps {
    outerIsRed: boolean
    disabled?: boolean
}

const AutoComplete = ({ outerIsRed, disabled, ...initialValues }: AutoCompleteInitialValue & WithAutoCompleteProps) => {
    return (
        <AutoCompleteStoreProvider {...initialValues}>
            <div className="relative">
                <AutoCompleteInput outerIsRed={outerIsRed} disabled={disabled} />
                <AutoCompleteContent />
            </div>
        </AutoCompleteStoreProvider>
    )
}

export default AutoComplete
