import Input from "@/packages/components/Input/Input"
import type { BookDetail } from "../_bookWriteInterfaces"
import useBookWriteStore from "../_bookWriteStore"

const BWInputCell = ({
    value,
    rowIndex,
    columnKey,
}: {
    value: string
    rowIndex: number
    columnKey: keyof BookDetail
}) => {
    const updateTableData = useBookWriteStore((state) => state.updateRowArray)
    const overlayingRowArray = useBookWriteStore((state) => state.overlayingRowArray)

    const handleUpdate = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        const newValue = event.target.value
        updateTableData(rowIndex, columnKey, newValue)
    }

    return (
        <div className="relative">
            <Input colorChangeIn="fill" variant="ghost" defaultValue={value} onBlur={handleUpdate} />
            <p className="text-fg-muted pointer-events-none absolute top-1/2 left-6 -translate-y-1/2">
                {overlayingRowArray[rowIndex][columnKey]}
            </p>
        </div>
    )
}

export default BWInputCell
