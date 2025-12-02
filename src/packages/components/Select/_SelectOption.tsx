import type { JSX } from "react"
import useSelectContext from "./_useSelectContext"
import { Hstack } from "../layouts"
import RoundBox from "../RoundBox"

const SelectOption = ({ icon, value, children }: { icon?: JSX.Element; value?: string | number; children: string }) => {
    const { onOptionSelect, setIsOpened, setSelectedValue, setSelectedChildren, setSelectedIcon } = useSelectContext()

    const handleClick = () => {
        setSelectedIcon(icon ?? null)
        setIsOpened(false)
        setSelectedValue(value)
        setSelectedChildren(children)
        onOptionSelect(value ?? children)
    }

    // TODO: 나중에 p 태그는 Text로 교체
    return (
        <RoundBox
            isBordered={false}
            onClick={handleClick}
            className="cursor-pointer bg-white px-3 py-2 transition hover:bg-gray-50"
        >
            <Hstack>
                <div className="text-gray-400">{icon && icon}</div>
                <p>{children}</p>
            </Hstack>
        </RoundBox>
    )
}

export default SelectOption
