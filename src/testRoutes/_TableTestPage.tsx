import { Container } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { tableDummyColumns } from "./_TableDummyColumns"
import { tableDummyData } from "./_TableDummyData"

const TableTestPage = () => {
    const table = useReactTable({
        columns: tableDummyColumns,
        data: tableDummyData,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Container width="lg" isPadded>
            <RoundBox isBordered padding="xl">
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
                                        className="border-border-dim hover:outline-border-muted z-10 border px-3 py-2 hover:outline"
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </RoundBox>
        </Container>
    )
}

export default TableTestPage
