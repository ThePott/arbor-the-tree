import { createColumnHelper } from "@tanstack/react-table"
import type { Book } from "./_TableDummyData"

const columnHelper = createColumnHelper<Book>()

export const tableDummyColumns = [
    columnHelper.accessor("title", { header: "문제집 제목", cell: (info) => info.getValue() }),
    columnHelper.accessor("publishedYear", { header: "출간년도", cell: (info) => info.getValue() }),
    columnHelper.accessor("modifiedAt", { header: "수정일", cell: (info) => info.getValue() }),
    // columnHelper.display({
    //     id: "delete",
    //     cell: (props) => <p>{JSON.stringify(props)}</p>,
    // }),
    // columnHelper.display({
    //     id: "menu",
    //     cell: (props) => <p>{JSON.stringify(props)}</p>,
    // }),
]
