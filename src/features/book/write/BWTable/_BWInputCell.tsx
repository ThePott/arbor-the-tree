import Input from "@/packages/components/Input/Input"
import type { BookDetail } from "../_bookWriteInterfaces"
import useBookWriteStore from "../_bookWriteStore"

const BWInputCell = ({ value, rowIndex, columnKey }: { value: string; rowIndex: number; columnKey: string }) => {
    const updateTableData = useBookWriteStore((state) => state.updateActualValues)
    const handleUpdate = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        updateTableData(rowIndex, columnKey as keyof BookDetail, event.target.value)
    }

    return (
        <div className="relative">
            <Input colorChangeIn="fill" variant="ghost" defaultValue={value} onBlur={handleUpdate} />
            <p className="text-fg-muted pointer-events-none absolute top-1/2 left-6 -translate-y-1/2">asdfasdf</p>
        </div>
    )
}

export default BWInputCell
