import { useRef, useState } from "react"
import SelectTrigger from "./_SelectTrigger"
import SelectContent from "./_SelectContent"
import SelectOption from "./_SelectOption"
import type { DivProps } from "@/shared/interfaces"
import { SelectContext } from "./_useSelectContext"

// NOTE: onSelect는 이미 있는 이름이라 쓰면 안 됨
interface WithSelectProps {
    onOptionSelect: (value: string | number) => void
    isInDanger?: boolean
    value?: string | number
    label?: string
    defaultLabel?: string
}

/**
 * NOTE: MUST USE `value`, `label`, and as key
 * */
const Select = ({
    onOptionSelect,
    isInDanger,
    value,
    label,
    defaultLabel,
    ...props
}: Omit<DivProps, "classNamee"> & WithSelectProps) => {
    const { children, ...rest } = props

    const [isOpened, setIsOpened] = useState<boolean>(false)
    const [selectedValue, setSelectedValue] = useState<string | number | null>(value ?? null)
    const [selectedLabel, setSelectedLabel] = useState<string | null>(label ?? null)
    const triggerRef = useRef<HTMLButtonElement>(null)

    return (
        <SelectContext
            value={{
                onOptionSelect,
                isOpened,
                setIsOpened,
                selectedValue,
                setSelectedValue,
                selectedLabel,
                defaultLabel,
                setSelectedLabel,
                triggerRef,
                isInDanger,
            }}
        >
            <div {...rest} className="relative">
                {children}
            </div>
        </SelectContext>
    )
}

Select.Trigger = SelectTrigger
Select.Content = SelectContent
Select.Option = SelectOption

export default Select
