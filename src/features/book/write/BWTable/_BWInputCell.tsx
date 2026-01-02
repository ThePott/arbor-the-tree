import Input from "@/packages/components/Input/Input"
import type { BookWriteRowFlat } from "../_bookWriteInterfaces"
import useBookWriteStore from "../_bookWriteStore"

const BWInputCell = ({
    value,
    rowIndex,
    columnKey,
}: {
    value: string
    rowIndex: number
    columnKey: keyof BookWriteRowFlat
}) => {
    const rowArray = useBookWriteStore((state) => state.rowArray)
    const updateRowArray = useBookWriteStore((state) => state.updateRowArray)

    const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        const newValue = event.target.value
        updateRowArray(rowIndex, columnKey, newValue)
    }

    const cell = rowArray[rowIndex][columnKey]

    return (
        <div className="relative">
            <Input colorChangeIn="fill" variant="ghost" defaultValue={value} onBlur={handleBlur} isRed={cell.isError} />
            <p className="text-fg-muted pointer-events-none absolute top-1/2 left-6 -translate-y-1/2">
                {cell.overlaying}
            </p>
        </div>
    )
}

export default BWInputCell
