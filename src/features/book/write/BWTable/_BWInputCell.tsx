import Input from "@/packages/components/Input/Input"
import type { CellContext } from "@tanstack/react-table"
import type { BookDetail } from "../_bookWriteInterfaces"

const BWInputCell = ({ getValue, row: { index }, column: { id }, table }: CellContext<BookDetail, string>) => {
    const handleUpdate = (event: React.FocusEvent<HTMLInputElement, Element>) =>
        table.options.meta?.updateData(index, id, event.target.value)

    return <Input colorChangeIn="fill" variant="ghost" defaultValue={getValue()} onBlur={handleUpdate} />
}

export default BWInputCell
