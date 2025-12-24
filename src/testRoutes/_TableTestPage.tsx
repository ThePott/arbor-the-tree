import { Container } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import { getCoreRowModel, useReactTable, type Header } from "@tanstack/react-table"
import { tableDummyColumns } from "./_TableDummyColumns"
import { tableDummyData, type Book } from "./_TableDummyData"

const HeaderCell = ({ header }: { header: Header<Book, unknown> }) => {
    return <>{header.column.columnDef.header}</>
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
                    <tr>
                        {table.getFlatHeaders().map((header) => (
                            <HeaderCell header={header} />
                        ))}
                    </tr>
                </table>
            </RoundBox>
        </Container>
    )
}

export default TableTestPage
