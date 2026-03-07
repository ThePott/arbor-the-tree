import { useRef, type RefObject } from "react"
import { SelectStoreProvider } from "./store"

export type SelectOption<T extends string | number> = {
    value: T
    label: string
}
type NewSelectProps<T extends string | number> = {
    optionArray: SelectOption<T>[]
    onOptionSelect: (value: string | number) => void
    isInDanger?: boolean
    defaultValue?: T
    disabled?: boolean
}
export type NewSelectPassedProps<T extends string | number> = NewSelectProps<T> & {
    triggerRef: RefObject<HTMLButtonElement | null>
}

const NewSelect = <T extends string | number>(props: NewSelectProps<T>) => {
    const triggerRef = useRef<HTMLButtonElement>(null)
    return (
        <SelectStoreProvider passedProps={{ ...props, triggerRef }}>
            <div />
        </SelectStoreProvider>
    )
}

export default NewSelect
