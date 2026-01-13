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
import useGlobalStore from "@/shared/store/globalStore"
import type { Role } from "@/shared/interfaces"
import { manageResumeQueryOptions } from "../../loader"

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

const maintainierColumnHelper = createColumnHelper<ManageResumeRow>()
const maintainerColumns = [
    ...MANAGE_RESUME_ROW_KEY_ARRAY.map((key) =>
        maintainierColumnHelper.accessor(key, {
            header: MANAGE_RESUME_ROW_KEY_TO_LABEL[key],
            cell: (info) => info.getValue(),
        })
    ),
    maintainierColumnHelper.display({
        id: "accept",
        cell: ({
            row: {
                original: { id },
            },
        }) => <AcceptButton resume_id={id} />,
    }),
]
type MaintainerConvertDataToRowArrayProps = { extendedResumeArray: ExtendedResume[] }
const maintainerConvertDataToRowArray = ({
    extendedResumeArray,
}: MaintainerConvertDataToRowArrayProps): ManageResumeRow[] => {
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

const principalColumnHelper = createColumnHelper<Omit<ManageResumeRow, "hagwon_name">>()
const principalColumns = [
    ...MANAGE_RESUME_ROW_KEY_ARRAY.filter((key) => key !== "hagwon_name").map((key) =>
        principalColumnHelper.accessor(key, {
            header: MANAGE_RESUME_ROW_KEY_TO_LABEL[key],
            cell: (info) => info.getValue(),
        })
    ),
    principalColumnHelper.display({
        id: "accept",
        cell: ({
            row: {
                original: { id },
            },
        }) => <AcceptButton resume_id={id} />,
    }),
]
type PrincipalConvertDataToRowArrayProps = { extendedResumeArray: ExtendedResume[] }
const principalConvertDataToRowArray = ({
    extendedResumeArray,
}: PrincipalConvertDataToRowArrayProps): Omit<ManageResumeRow, "hagwon_name">[] => {
    const rowArray: Omit<ManageResumeRow, "hagwon_name">[] = extendedResumeArray.map((extendedResume) => ({
        id: extendedResume.id,
        name: extendedResume.users.name,
        role: roleToText[extendedResume.role],
        school_name: extendedResume.school_name,
        applied_at: extendedResume.applied_at.slice(0, 10),
    }))
    return rowArray
}

const ManageResumeTable = () => {
    const extendedResumeArray = useLoaderData({ from: "/manage/resume" })
    const { data } = useQuery(manageResumeQueryOptions)

    const me = useGlobalStore((state) => state.me)
    const allowedRoleArray: (Role | undefined)[] = ["MAINTAINER", "PRINCIPAL"]

    // NOTE: 커스텀 에러 클래스 만들어야
    if (!allowedRoleArray.includes(me?.role)) throw new Error("---- Unauthorized")

    const isMaintainer = me?.role === "MAINTAINER"
    const columns = isMaintainer ? maintainerColumns : principalColumns

    const rowArray = isMaintainer
        ? maintainerConvertDataToRowArray({ extendedResumeArray: data ?? extendedResumeArray })
        : principalConvertDataToRowArray({ extendedResumeArray: data ?? extendedResumeArray })

    // TODO: 에러 해결해야 함
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
