import TanstackTable from "@/packages/components/TanstackTable"
import { useLoaderData } from "@tanstack/react-router"
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Vstack } from "@/packages/components/layouts"
import Title from "@/packages/components/Title/Title"
import RoundBox from "@/packages/components/RoundBox"
import { useMemo } from "react"
import type { ExtendedStudent } from "@/featuresPerRoute/manage.student/types"

// NOTE: student_id 제외해야 함
// NOTE: 타입과 맞춰야 함
const MANAGE_STUDENT_COLUMN_KEY_ARRAY = ["name", "school", "grade"] as const
type ManageStudentColumnKey = (typeof MANAGE_STUDENT_COLUMN_KEY_ARRAY)[number]
const columnKeyToLabel: Record<ManageStudentColumnKey, string> = {
    name: "이름",
    school: "학교",
    grade: "학년",
}
type ManageStudentRow = {
    student_id: string
    name: string
    school: string
    grade?: number
}
const convertDataToRowArray = (studentArray: ExtendedStudent[]): ManageStudentRow[] => {
    const rowArray: ManageStudentRow[] = studentArray.map((student) => ({
        name: student.users.name,
        student_id: student.id,
        school: student.school.name,
        grade: student.grade,
    }))
    return rowArray
}

const columnHelper = createColumnHelper<ManageStudentRow>()
const columns = MANAGE_STUDENT_COLUMN_KEY_ARRAY.map((key) =>
    columnHelper.accessor(key, { header: columnKeyToLabel[key], cell: (info) => info.getValue() })
)

const IsolatedStudentTable = () => {
    const { studentArray, classroomStudentArray } = useLoaderData({ from: "/manage/student" })
    const isolatedStudentArray = studentArray.filter((student) => {
        const index = classroomStudentArray.findIndex((classroomStudent) => classroomStudent.student_id === student.id)
        return index === -1
    })
    const rowArray = useMemo(() => convertDataToRowArray(isolatedStudentArray), [isolatedStudentArray])

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({ data: rowArray, columns, getCoreRowModel: getCoreRowModel() })
    return (
        <RoundBox padding="lg" isBordered radius="lg">
            <Vstack>
                <Title as="h2">개별 진도</Title>
                <TanstackTable table={table} />{" "}
            </Vstack>
        </RoundBox>
    )
}

export default IsolatedStudentTable
