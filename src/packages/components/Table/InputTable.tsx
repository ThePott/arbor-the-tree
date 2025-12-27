import InputTableContent from "./InputTableContent"
import { InputTableProvider, type InputTablePassedProps } from "./inputTableStore"

const InputTable = <Tkey extends string>(props: InputTablePassedProps<Tkey>) => {
    return (
        <InputTableProvider passedProps={props}>
            <InputTableContent {...props} />
        </InputTableProvider>
    )
}

export default InputTable
