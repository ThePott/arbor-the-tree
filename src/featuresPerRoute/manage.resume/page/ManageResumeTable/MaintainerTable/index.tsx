import {
    type ManageResumeRow,
    MANAGE_RESUME_ROW_KEY_ARRAY,
    MANAGE_RESUME_ROW_KEY_TO_LABEL,
    type ExtendedResume,
} from "@/featuresPerRoute/manage.resume/types"
import { roleToText } from "@/shared/utils/apiTypeToLabel"
import AcceptButton from "../AcceptButton"
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import TanstackTable from "@/packages/components/TanstackTable"
import { useMemo } from "react"

const columnHelper = createColumnHelper<ManageResumeRow>()
const columns = [
    ...MANAGE_RESUME_ROW_KEY_ARRAY.map((key) =>
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
const convertDataToRowArray = ({ extendedResumeArray }: convertDataToRowArrayProps): ManageResumeRow[] => {
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

type MaintainerTableProps = { extendedResumeArray: ExtendedResume[] }
const MaintainerTable = ({ extendedResumeArray }: MaintainerTableProps) => {
    const rowArray = useMemo(() => convertDataToRowArray({ extendedResumeArray }), [extendedResumeArray])

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({ data: rowArray, columns: columns, getCoreRowModel: getCoreRowModel() })
    return <TanstackTable table={table} />
}

export default MaintainerTable
