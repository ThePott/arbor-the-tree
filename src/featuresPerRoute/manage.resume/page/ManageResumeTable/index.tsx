import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import {
    MANAGE_RESUME_ROW_KEY_ARRAY,
    MANAGE_RESUME_ROW_KEY_TO_LABEL,
    type ExtendedResume,
    type ManageResumeRow,
} from "../../types"
import Button from "@/packages/components/Button/Button"
import { Check } from "lucide-react"
import { useLoaderData } from "@tanstack/react-router"
import { roleToText } from "@/shared/utils/apiTypeToLabel"

const columnHelper = createColumnHelper<ManageResumeRow>()
const columns = [
    ...MANAGE_RESUME_ROW_KEY_ARRAY.map((key) =>
        columnHelper.accessor(key, { header: MANAGE_RESUME_ROW_KEY_TO_LABEL[key], cell: (info) => info.getValue() })
    ),
    columnHelper.display({
        id: "accept",
        cell: () => (
            <Button isBorderedOnHover>
                <Check />
            </Button>
        ),
    }),
]
type ExtendedResumeArrayToRowArrayProps = { extendedResumeArray: ExtendedResume[] }
const convertDataToRowArray = ({ extendedResumeArray }: ExtendedResumeArrayToRowArrayProps): ManageResumeRow[] => {
    const rowArray: ManageResumeRow[] = extendedResumeArray.map((extendedResume) => ({
        name: extendedResume.users.name,
        role: roleToText[extendedResume.role],
        hagwon_name: extendedResume.hagwon_name,
        school_name: extendedResume.school_name,
        applied_at: extendedResume.applied_at.slice(0, 10),
    }))
    return rowArray
}

const ManageResumeTable = () => {
    const extendedResumeArray = useLoaderData({ from: "/manage/resume" })
    const rowArray = convertDataToRowArray({ extendedResumeArray })

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({ columns, data: rowArray, getCoreRowModel: getCoreRowModel() })

    return (
        <table className="rounded-my-md outline-fg-dim overflow-hidden outline">
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
                            <td key={cell.id} className="px-4 py-2 text-center">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ManageResumeTable
