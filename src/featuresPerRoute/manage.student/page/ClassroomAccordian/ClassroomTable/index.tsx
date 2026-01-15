import type { ExtendedClassroom } from "@/featuresPerRoute/manage.student/types"
import { instance } from "@/packages/api/axiosInstances"
import Button from "@/packages/components/Button/Button"
import { Vstack } from "@/packages/components/layouts"
import TanstackTable from "@/packages/components/TanstackTable"
import { useMutation } from "@tanstack/react-query"
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { X } from "lucide-react"
import { useMemo } from "react"

// NOTE: student_id 빼고는 type과 일치해야 함
const COLUMN_KEY_ARRAY = ["student_name", "school_name", "grade"] as const
type ColumnKey = (typeof COLUMN_KEY_ARRAY)[number]
const KEY_TO_LABEL: Record<ColumnKey, string> = {
    student_name: "이름",
    school_name: "학교",
    grade: "학년",
} as const
type ClassroomRow = {
    classroom_student_id: string
    student_name: string
    school_name: string
    grade?: number
    other_classrooms: string[]
}
const convertDataToRowArray = (extendedClassroom: ExtendedClassroom): ClassroomRow[] => {
    const classroomRowArray: ClassroomRow[] = extendedClassroom.classroomStudents.map((classroomStudent) => ({
        classroom_student_id: classroomStudent.id,
        student_name: classroomStudent.student.users.name,
        school_name: classroomStudent.student.school.name,
        grade: classroomStudent.student.grade,
        // TODO: 이거 받아오게 수정해야 함
        other_classrooms: classroomStudent.student.classroomStudents
            .filter((cs) => cs.id !== classroomStudent.id)
            .map((cs) => cs.classroom.name),
    }))
    return classroomRowArray
}

type ExcludeButtonProps = {
    classroom_student_id: string
}
const ExcludeButton = ({ classroom_student_id }: ExcludeButtonProps) => {
    const deleteMutation = useMutation({
        mutationFn: () => instance.delete(`/manage/classroom-student/${classroom_student_id}`),
    })
    const handleClick = () => {
        deleteMutation.mutate()
    }
    return (
        <Button onClick={handleClick}>
            <X size={16} />
        </Button>
    )
}

const columnHelper = createColumnHelper<ClassroomRow>()
const columns = [
    ...COLUMN_KEY_ARRAY.map((key) =>
        columnHelper.accessor(key, { header: KEY_TO_LABEL[key], cell: (info) => info.getValue() })
    ),
    columnHelper.accessor("other_classrooms", {
        header: "다른 반",
        cell: (info) => (
            <Vstack gap="none">
                {info.getValue().map((clasroom_name) => (
                    <p key={clasroom_name}>{clasroom_name}</p>
                ))}
            </Vstack>
        ),
    }),
    columnHelper.display({
        id: "exclude",
        cell: ({
            row: {
                original: { classroom_student_id },
            },
        }) => <ExcludeButton classroom_student_id={classroom_student_id} />,
    }),
]
type ClassroomTableProps = {
    extendedClassroom: ExtendedClassroom
}
const ClassroomTable = ({ extendedClassroom }: ClassroomTableProps) => {
    const rowArray = useMemo(() => convertDataToRowArray(extendedClassroom), [extendedClassroom])

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({ data: rowArray, columns, getCoreRowModel: getCoreRowModel() })
    return <TanstackTable table={table} />
}

export default ClassroomTable
