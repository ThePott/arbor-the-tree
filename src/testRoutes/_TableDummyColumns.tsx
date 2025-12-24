import { createColumnHelper } from "@tanstack/react-table"
import type { Book } from "./_TableDummyData"

const columnHelper = createColumnHelper<Book>()

export const tableDummyColumns = [
    columnHelper.accessor("title", { header: "문제집 제목" }),
    columnHelper.accessor("publishedYear", { header: "출간년도" }),
    columnHelper.accessor("modifiedAt", { header: "수정일" }),
    // columnHelper.display({
    //     id: "delete",
    //     cell: (props) => <p>{JSON.stringify(props)}</p>,
    // }),
    // columnHelper.display({
    //     id: "menu",
    //     cell: (props) => <p>{JSON.stringify(props)}</p>,
    // }),
]
