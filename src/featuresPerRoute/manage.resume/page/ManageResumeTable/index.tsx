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
import { useMutation, useQuery } from "@tanstack/react-query"
import { withHeadInstance } from "@/packages/api/axiosInstances"
import { makeManageResumeQueryOptions } from "../../loader"

type AcceptButtonProps = { resume_id: string }
const AcceptButton = ({ resume_id }: AcceptButtonProps) => {
    const postMutation = useMutation({
        mutationFn: () => withHeadInstance.post(`/auth/resume/${resume_id}/accept`),
        onMutate: async (_variables, context) => {
            await context.client.cancelQueries({ queryKey: ["resume"] })
            const previousResumeArray = context.client.getQueryData(["resume"]) as ExtendedResume[]

            const newResumeArray = previousResumeArray.filter((resume) => resume.id !== resume_id)
            context.client.setQueryData(["resume"], newResumeArray)

            return { previousResumeArray }
        },
        onError: (_error, _variables, onMutateResult, context) => {
            context.client.setQueryData(["resume"], onMutateResult?.previousResumeArray)
        },
        onSettled: (_data, _error, _variables, _onMutateResult, context) => {
            context.client.invalidateQueries({ queryKey: ["resume"] })
        },
    })

    const handleClick = () => {
        postMutation.mutate()
    }

    return (
        <Button isBorderedOnHover onClick={handleClick}>
            <Check />
        </Button>
    )
}

const columnHelper = createColumnHelper<ManageResumeRow>()
const columns = [
    ...MANAGE_RESUME_ROW_KEY_ARRAY.map((key) =>
        columnHelper.accessor(key, { header: MANAGE_RESUME_ROW_KEY_TO_LABEL[key], cell: (info) => info.getValue() })
    ),
    columnHelper.display({
        id: "accept",
        cell: ({
            row: {
                original: { id },
            },
        }) => <AcceptButton resume_id={id} />,
    }),
]
type ExtendedResumeArrayToRowArrayProps = { extendedResumeArray: ExtendedResume[] }
const convertDataToRowArray = ({ extendedResumeArray }: ExtendedResumeArrayToRowArrayProps): ManageResumeRow[] => {
    const rowArray: ManageResumeRow[] = extendedResumeArray.map((extendedResume) => ({
        id: extendedResume.id,
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
    const { data } = useQuery(makeManageResumeQueryOptions<"useQuery">())
    const rowArray = convertDataToRowArray({ extendedResumeArray: data ?? extendedResumeArray })

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
