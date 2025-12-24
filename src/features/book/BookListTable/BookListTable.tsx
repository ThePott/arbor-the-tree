import { tableDummyColumns } from "@/testRoutes/_TableDummyColumns"
import { tableDummyData } from "@/testRoutes/_TableDummyData"
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import clsx from "clsx"

const BookListTable = () => {
    const table = useReactTable({
        columns: tableDummyColumns,
        data: tableDummyData,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <table>
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th
                                key={header.id}
                                className="border-border-dim hover:outline-border-muted z-10 border px-3 py-2 hover:outline"
                            >
                                {header.isPlaceholder
                                    ? "this is header placeholder"
                                    : flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td
                                key={cell.id}
                                className={clsx(
                                    "border-border-dim hover:outline-border-muted z-10 border px-3 py-2 hover:outline",
                                    cell.column.id !== "title" && "text-center"
                                )}
                            >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default BookListTable
