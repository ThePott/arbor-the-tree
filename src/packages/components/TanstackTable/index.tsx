import { flexRender, type Table } from "@tanstack/react-table"

type TanstackTableProps<T> = {
    table: Table<T>
}

const TanstackTable = <T extends object>({ table }: TanstackTableProps<T>) => {
    return (
        <table className="rounded-my-md outline-fg-dim overflow-hidden text-left outline">
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id} className="text-fg-muted px-4 py-2">
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
                    <tr key={row.id} className="border-t-fg-dim border-t">
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="px-4 py-2">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TanstackTable
