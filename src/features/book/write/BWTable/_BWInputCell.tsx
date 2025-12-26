import Input from "@/packages/components/Input/Input"
import type { CellContext } from "@tanstack/react-table"
import type { BookDetail } from "../_bookWriteInterfaces"
import useBookWriteStore from "../_bookWriteStore"

const BWInputCell = ({ getValue, row: { index }, column: { id } }: CellContext<BookDetail, string>) => {
    const updateTableData = useBookWriteStore((state) => state.updateTableData)
    const handleUpdate = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        updateTableData(index, id as keyof BookDetail, event.target.value)
    }

    return (
        <div className="relative">
            <Input colorChangeIn="fill" variant="ghost" defaultValue={getValue()} onBlur={handleUpdate} />{" "}
            <p className="text-fg-muted pointer-events-none absolute top-1/2 left-6 -translate-y-1/2">asdfasdf</p>
        </div>
    )
}

export default BWInputCell
