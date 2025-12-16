import RoundBox from "../RoundBox"
import { Vstack } from "../layouts"
import AutoCompleteOption from "./_AutoCompleteItem"
import { useAutoCompleteStore } from "./_autoCompleteHooks"

const AutoCompleteContent = () => {
    const optionArray = useAutoCompleteStore((state) => state.optionArray)
    const isContentOn = useAutoCompleteStore((state) => state.isContentOn)
    const inputValue = useAutoCompleteStore((state) => state.inputValue)

    const filteredOptionArray = optionArray.filter((option) => option.includes(inputValue))

    if (!isContentOn) {
        return null
    }

    return (
        <RoundBox
            color="bg2"
            padding="md"
            className="mt-my-sm absolute top-full max-h-[500px] w-full overflow-y-scroll"
        >
            <Vstack>
                {filteredOptionArray.map((option) => (
                    <AutoCompleteOption key={option}>{option}</AutoCompleteOption>
                ))}
            </Vstack>
        </RoundBox>
    )
}

export default AutoCompleteContent
