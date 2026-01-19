import {
    type ExtendedResume,
    MANAGE_RESUME_ROW_KEY_ARRAY,
    MANAGE_RESUME_ROW_KEY_TO_LABEL,
    type ManageResumeRow,
} from "@/featuresPerRoute/manage.resume/types"
import TanstackTable from "@/packages/components/TanstackTable"
import { debugRender } from "@/shared/config/debug/debug"
import { roleToText } from "@/shared/utils/apiTypeToLabel"
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useMemo } from "react"
import AcceptButton from "../AcceptButton"

const columnHelper = createColumnHelper<Omit<ManageResumeRow, "hagwon_name">>()
const columns = [
    ...MANAGE_RESUME_ROW_KEY_ARRAY.filter((key) => key !== "hagwon_name").map((key) =>
        columnHelper.accessor(key, {
            header: MANAGE_RESUME_ROW_KEY_TO_LABEL[key],
            cell: (info) => info.getValue(),
        })
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

type convertDataToRowArrayProps = { extendedResumeArray: ExtendedResume[] }
const convertDataToRowArray = ({
    extendedResumeArray,
}: convertDataToRowArrayProps): Omit<ManageResumeRow, "hagwon_name">[] => {
    const rowArray: Omit<ManageResumeRow, "hagwon_name">[] = extendedResumeArray.map((extendedResume) => ({
        id: extendedResume.id,
        name: extendedResume.users.name,
        role: roleToText[extendedResume.role],
        school_name: extendedResume.school_name,
        applied_at: extendedResume.applied_at.slice(0, 10),
    }))
    return rowArray
}
type PrincipalTableProps = { extendedResumeArray: ExtendedResume[] }
const PrincipalTable = ({ extendedResumeArray }: PrincipalTableProps) => {
    debugRender("PrincipalTable")
    const rowArray = useMemo(() => convertDataToRowArray({ extendedResumeArray }), [extendedResumeArray])
    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({ data: rowArray, columns, getCoreRowModel: getCoreRowModel() })

    return <TanstackTable table={table} />
}

export default PrincipalTable
