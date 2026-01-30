import useDetectOutsideClick from "@/packages/utils/useDetectOutsideClick"
import type { ValueLabel } from "@/shared/interfaces"
import useGlobalStore from "@/shared/store/globalStore"
import clsx from "clsx"
import { getRegExp } from "korean-regexp"
import { useEffect } from "react"
import Button from "../../Button/Button"
import ExpandableDiv from "../../ExpandableDiv/ExpendableDiv"
import { Vstack } from "../../layouts"
import RoundBox from "../../RoundBox"
import useLocalAutoCompleteStore from "../useLocalAutoCompleteStore"

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

    const { contentRef } = useDetectOutsideClick({
        triggerRef: inputRef,
        isOn: isContentOn,
        onOutsideClick: () => setIsContentOn(false),
    })

    const filteredOptionArray = optionArray.filter(({ label }) => label.match(getRegExp(inputValue)))

    const isVisible = isContentOn && filteredOptionArray.length > 0

    useEffect(() => {
        setIsBodyScrollable(!isVisible)
    }, [isVisible])

    return (
        <ExpandableDiv className="my-my-sm absolute top-full z-10 w-[400px]">
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
                            <LocalAutoCompleteOption key={option.value} option={option} />
                        ))}
                    </Vstack>
                </RoundBox>
            )}
        </ExpandableDiv>
    )
}

export default LocalAutoCompleteContent
