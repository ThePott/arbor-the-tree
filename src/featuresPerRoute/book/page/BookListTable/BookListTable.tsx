import { debugRender } from "@/shared/config/debug/"
import type { Book } from "@/shared/interfaces"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import clsx from "clsx"
import bookColumns from "./_BookListTableColumns"

const BookListTable = ({ bookArray }: { bookArray: Book[] }) => {
    debugRender("BookListTable")
    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({
        columns: bookColumns,
        data: bookArray,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <table className="rounded-my-lg outline-fg-dim overflow-hidden outline">
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id} className="text-fg-muted z-10 px-6 py-2 text-left">
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
                    <tr key={row.id} className="border-border-dim hover:bg-bg-0 border-t">
                        {row.getVisibleCells().map((cell) => (
                            <td
                                key={cell.id}
                                className={clsx(
                                    "z-10 px-6 py-2",
                                    cell.column.id !== "title" && "w-[100px] text-center"
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
