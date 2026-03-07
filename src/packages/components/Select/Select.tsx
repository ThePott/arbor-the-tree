import type { DivProps } from "@/shared/interfaces"
import { flip, offset, shift, useFloating } from "@floating-ui/react"
import { useEffect, useRef } from "react"
import SelectContent from "./_SelectContent"
import SelectOption from "./_SelectOption"
import { SelectProvider, useSelectStore, type SelectPassedProps } from "./_selectStore"
import SelectTrigger from "./_SelectTrigger"

// NOTE: onSelect는 이미 있는 이름이라 쓰면 안 됨
export type WithSelectProps = {
    onOptionSelect: (value: string | number) => void
    isInDanger?: boolean
    defaultOption?: { label: string; value: string | number }
    disabled?: boolean
}

const WrappedSelect = (props: Omit<DivProps, "className">) => {
    const { children, ...rest } = props

    const setFloatinReturns = useSelectStore((state) => state.setFloatingReturns)

    const floatingReturns = useFloating({
        middleware: [flip(), shift(), offset(4)],
        placement: "bottom-start",
    })
    useEffect(() => {
        setFloatinReturns(floatingReturns)
    }, [floatingReturns])

    return (
        <div {...rest} className="relative">
            {children}
        </div>
    )
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
            <WrappedSelect {...rest}>{children}</WrappedSelect>
        </SelectProvider>
    )
}

Select.Trigger = SelectTrigger
Select.Content = SelectContent
Select.Option = SelectOption

export default Select
