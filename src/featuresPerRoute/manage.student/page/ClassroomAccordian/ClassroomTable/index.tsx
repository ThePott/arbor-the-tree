import type { ExtendedClassroom } from "@/featuresPerRoute/manage.student/types"
import Button from "@/packages/components/Button/Button"
import TanstackTable from "@/packages/components/TanstackTable"
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { X } from "lucide-react"

// NOTE: student_id 빼고는 type과 일치해야 함
const COLUMN_KEY_ARRAY = ["student_name", "school_name", "grade", "other_classrooms"] as const
type ColumnKey = (typeof COLUMN_KEY_ARRAY)[number]
const KEY_TO_LABEL: Record<ColumnKey, string> = {
    student_name: "이름",
    school_name: "학교",
    grade: "학년",
    other_classrooms: "다른 반",
} as const
type ClassroomRow = {
    classroom_student_id: string
    student_name: string
    school_name: string
    grade?: number
    other_classrooms?: string[]
}
const convertDataToRowArray = (extendedClassroom: ExtendedClassroom): ClassroomRow[] => {
    const classroomRowArray: ClassroomRow[] = extendedClassroom.classroomStudents.map((classroomStudent) => ({
        classroom_student_id: classroomStudent.id,
        student_name: classroomStudent.student.users.name,
        school_name: classroomStudent.student.school.name,
        grade: classroomStudent.student.grade,
        // TODO: 이거 받아오게 수정해야 함
        other_classrooms: undefined,
    }))
    return classroomRowArray
}

const columnHelper = createColumnHelper<ClassroomRow>()
const columns = [
    ...COLUMN_KEY_ARRAY.map((key) =>
        columnHelper.accessor(key, { header: KEY_TO_LABEL[key], cell: (info) => info.getValue() })
    ),
    columnHelper.display({
        id: "exclude",
        cell: () => (
            <Button>
                <X />
            </Button>
        ),
    }),
]
type ClassroomTableProps = {
    extendedClassroom: ExtendedClassroom
}
const ClassroomTable = ({ extendedClassroom }: ClassroomTableProps) => {
    const rowArray = convertDataToRowArray(extendedClassroom)

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({ data: rowArray, columns, getCoreRowModel: getCoreRowModel() })
    return <TanstackTable table={table} />
}

export default ClassroomTable
