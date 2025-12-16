import RoundBox from "../RoundBox"
import { Vstack } from "../layouts"
import AutoCompleteOption from "./_AutoCompleteItem"
import { useAutoCompleteStore } from "./_autoCompleteHooks"

const AutoCompleteContent = () => {
    const optionArray = useAutoCompleteStore((state) => state.optionArray)

    return (
        <RoundBox color="bg2" padding="md" className="max-h-[500px] overflow-y-scroll">
            <Vstack>
                {optionArray.map((option) => (
                    <AutoCompleteOption key={option}>{option}</AutoCompleteOption>
                ))}
            </Vstack>
        </RoundBox>
    )
}

export default AutoCompleteContent
