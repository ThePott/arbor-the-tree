import useDetectOutsideClick from "@/packages/utils/useDetectOutsideClick"
import useGlobalStore from "@/shared/store/globalStore"
import useLocalAutoCompleteStore from "../useLocalAutoCompleteStore"
import { useEffect } from "react"
import ExpandableDiv from "../../ExpandableDiv/ExpendableDiv"
import RoundBox from "../../RoundBox"
import clsx from "clsx"
import { Vstack } from "../../layouts"
import Button from "../../Button/Button"
import type { ValueLabel } from "@/shared/interfaces"
import { getRegExp } from "korean-regexp"

type LocalAutoCompleteOptionProps = {
    option: ValueLabel
}
const LocalAutoCompleteOption = ({ option }: LocalAutoCompleteOptionProps) => {
    const setInputValue = useLocalAutoCompleteStore((state) => state.setInputValue)
    const handleClick = () => {
        setInputValue(option.label)
    }
    return (
        <Button isOnLeft color="black" isBorderedOnHover onClick={handleClick}>
            {option.label}
        </Button>
    )
}

const LocalAutoCompleteContent = () => {
    const setIsBodyScrollable = useGlobalStore((state) => state.setIsBodyScrollable)
    const inputRef = useLocalAutoCompleteStore((state) => state.inputRef)
    const inputValue = useLocalAutoCompleteStore((state) => state.inputValue)
    const optionArray = useLocalAutoCompleteStore((state) => state.optionArray)
    const isContentOn = useLocalAutoCompleteStore((state) => state.isContentOn)
    const setIsContentOn = useLocalAutoCompleteStore((state) => state.setIsContentOn)

    const { contentRef } = useDetectOutsideClick(inputRef, isContentOn, () => setIsContentOn(false))

    const filteredOptionArray = optionArray.filter(({ label }) => label.match(getRegExp(inputValue)))

    const isVisible = isContentOn && filteredOptionArray.length > 0

    useEffect(() => {
        setIsBodyScrollable(!isVisible)
    }, [isVisible])

    return (
        <ExpandableDiv className="my-my-sm absolute top-full z-10 w-full">
            {isVisible && (
                <RoundBox
                    ref={contentRef}
                    color="bg3"
                    padding="md"
                    className={clsx("max-h-[200px] overflow-y-scroll")}
                    isBordered
                >
                    <Vstack gap="none">
                        {filteredOptionArray.map((option) => (
                            <LocalAutoCompleteOption option={option} />
                        ))}
                    </Vstack>
                </RoundBox>
            )}
        </ExpandableDiv>
    )
}

export default LocalAutoCompleteContent
