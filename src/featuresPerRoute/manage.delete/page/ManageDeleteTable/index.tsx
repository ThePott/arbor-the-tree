import { useQuery } from "@tanstack/react-query"
import { useLoaderData } from "@tanstack/react-router"
import { manageDeleteQueryOptions } from "../../loader"
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import Button from "@/packages/components/Button/Button"
import { Trash } from "lucide-react"
import { MANAGE_DELETE_ROW_KET_TO_LABEL, MANAGE_DELETE_ROW_KEY_ARRAY, type ManageDeleteRow } from "../../types"
import type { AppUser } from "@/shared/interfaces"
import { roleToText } from "@/shared/utils/apiTypeToLabel"

const columnHelper = createColumnHelper<ManageDeleteRow>()
const columns = [
    ...MANAGE_DELETE_ROW_KEY_ARRAY.map((key) =>
        columnHelper.accessor(key, { header: MANAGE_DELETE_ROW_KET_TO_LABEL[key], cell: (info) => info.getValue() })
    ),
    columnHelper.display({
        id: "delete",
        cell: () => (
            <Button>
                <Trash />
            </Button>
        ),
    }),
]

const convertDataToRowArray = ({ appUserArray }: { appUserArray: AppUser[] }): ManageDeleteRow[] => {
    const rowArray: ManageDeleteRow[] = appUserArray.map((appUser) => ({
        name: appUser.name,
        phone_number: appUser.phone_number,
        role: appUser.role ? roleToText[appUser.role] : undefined,
    }))

    return rowArray
}
const ManageDeleteTable = () => {
    const userArray = useLoaderData({ from: "/manage/delete" })
    const { data } = useQuery(manageDeleteQueryOptions)

    const rowArray = convertDataToRowArray({ appUserArray: data ?? userArray })

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({ columns: columns, data: rowArray, getCoreRowModel: getCoreRowModel() })

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

export default ManageDeleteTable
