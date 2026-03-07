import type { DivProps } from "@/shared/interfaces"
import { useRef } from "react"
import SelectContent from "./_SelectContent"
import SelectOption from "./_SelectOption"
import { SelectProvider, type SelectPassedProps } from "./_selectStore"
import SelectTrigger from "./_SelectTrigger"

// NOTE: onSelect는 이미 있는 이름이라 쓰면 안 됨
export type WithSelectProps = {
    onOptionSelect: (value: string | number) => void
    isInDanger?: boolean
    defaultOption?: { label: string; value: string | number }
    disabled?: boolean
}

const Select = ({
    onOptionSelect,
    isInDanger,
    defaultOption,
    disabled,
    ...props
}: Omit<DivProps, "classNamee"> & WithSelectProps) => {
    const { children, ...rest } = props
    const triggerRef = useRef<HTMLButtonElement>(null)

    const passedProps: SelectPassedProps = {
        onOptionSelect,
        isInDanger,
        defaultOption,
        disabled,
        triggerRef,
    }

    return (
        <SelectProvider passedProps={passedProps}>
            <div {...rest} className="relative">
                {children}
            </div>
        </SelectProvider>
    )
}

Select.Trigger = SelectTrigger
Select.Content = SelectContent
Select.Option = SelectOption

export default Select
