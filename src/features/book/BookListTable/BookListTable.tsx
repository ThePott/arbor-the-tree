import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table"
import clsx from "clsx"
import bookColumns from "./_BookListTableColumns"
import type { Book } from "@/shared/interfaces"

const BookListTable = ({ bookArray }: { bookArray: Book[] }) => {
    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        columns: bookColumns,
        data: bookArray,
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
