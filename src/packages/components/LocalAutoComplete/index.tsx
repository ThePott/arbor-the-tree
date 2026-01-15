import { LocalAutoCompleteStoreProvider, type LocalAutoCompleteExternalValues } from "./LocalAutoCompleteStoreProvider"

const LocalAutoCompleteWrapper = () => {
    return <div></div>
}

const LocalAutoComplete = (externalValues: LocalAutoCompleteExternalValues) => {
    return (
        <LocalAutoCompleteStoreProvider {...externalValues}>
            <LocalAutoCompleteWrapper />
        </LocalAutoCompleteStoreProvider>
    )
}

export default LocalAutoComplete
