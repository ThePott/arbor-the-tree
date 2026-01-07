import { createColumnHelper } from "@tanstack/react-table"
import { BOOK_DETAIL_KEY_ARRAY, BOOK_DETAIL_KEY_TO_LABEL, type BookWriteRow } from "../_bookWriteInterfaces"
import BWInputCell from "./_BWInputCell"

const columnHelper = createColumnHelper<BookWriteRow>()

const bookWriteColumnArray = BOOK_DETAIL_KEY_ARRAY.map((key) =>
    columnHelper.accessor(key, {
        header: BOOK_DETAIL_KEY_TO_LABEL[key],
        cell: (info) => <BWInputCell columnKey={key} value={info.getValue().value} rowIndex={info.row.index} />,
    })
)

export default bookWriteColumnArray
