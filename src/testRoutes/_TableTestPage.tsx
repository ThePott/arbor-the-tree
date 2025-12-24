import { Container } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import { flexRender, getCoreRowModel, useReactTable, type Header, type Row } from "@tanstack/react-table"
import { tableDummyColumns } from "./_TableDummyColumns"
import { tableDummyData, type Book } from "./_TableDummyData"

const HeaderCell = ({ header }: { header: Header<Book, unknown> }) => {
    return <>{header.column.columnDef.header}</>
}

const RowComp = ({ row }: { row: Row<Book> }) => {
    return <>this is row</>
}

const BodyCell = () => {
    return <>this is body cell</>
}

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
                            <tr>
                                {headerGroup.headers.map((header) => (
                                    <th>
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
                            <tr>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
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
