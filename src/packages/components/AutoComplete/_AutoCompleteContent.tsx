import useDetectOutsideClick from "@/packages/utils/useDetectOutsideClick"
import RoundBox from "../RoundBox"
import { Vstack } from "../layouts"
import AutoCompleteOption from "./_AutoCompleteItem"
import { useAutoCompleteStore } from "./_autoCompleteHooks"
import ExpandableDiv from "../ExpandableDiv/ExpendableDiv"
import clsx from "clsx"

const AutoCompleteContent = () => {
    const optionArray = useAutoCompleteStore((state) => state.optionArray)
    const isContentOn = useAutoCompleteStore((state) => state.isContentOn)
    const setIsContentOn = useAutoCompleteStore((state) => state.setIsContentOn)
    const inputValue = useAutoCompleteStore((state) => state.inputValue)
    const inputRef = useAutoCompleteStore((state) => state.inputRef)

    const { contentRef } = useDetectOutsideClick(inputRef, isContentOn, () => setIsContentOn(false))

    const filteredOptionArray = optionArray.filter((option) => option.includes(inputValue))

    const isVisible = isContentOn && filteredOptionArray.length > 0

    return (
        <ExpandableDiv className="my-my-sm absolute top-full w-full">
            {isVisible && (
                <RoundBox
                    ref={contentRef}
                    color="bg3"
                    padding="md"
                    className={clsx("max-h-[200px] overflow-y-scroll")}
                    isBordered
                >
                    <Vstack>
                        {filteredOptionArray.map((option) => (
                            <AutoCompleteOption key={option}>{option}</AutoCompleteOption>
                        ))}
                    </Vstack>
                </RoundBox>
            )}
        </ExpandableDiv>
    )
}

export default AutoCompleteContent
