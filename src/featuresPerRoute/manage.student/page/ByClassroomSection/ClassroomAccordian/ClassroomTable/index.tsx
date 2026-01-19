import { ManageStudentLoaderQueryOptions } from "@/featuresPerRoute/manage.student/loader"
import type { ExtendedStudent } from "@/featuresPerRoute/manage.student/types"
import { Vstack } from "@/packages/components/layouts"
import TanstackTable from "@/packages/components/TanstackTable"
import { ClientError } from "@/shared/error/clientError"
import type { Classroom, ClassroomStudent } from "@/shared/interfaces"
import { useQuery } from "@tanstack/react-query"
import { useLoaderData } from "@tanstack/react-router"
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { useMemo } from "react"
import ExcludeButton from "./ExcludeButton"

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

type ConvertDataToRowArrayProps = {
    classroom_id: string // NOTE: 여기의 반의 학생 테이블 작성할 것
    classroomArray: Classroom[]
    classroomStudentArray: ClassroomStudent[]
    studentArray: ExtendedStudent[]
}
const convertDataToRowArray = ({
    classroom_id,
    classroomArray,
    classroomStudentArray,
    studentArray,
}: ConvertDataToRowArrayProps): ClassroomRow[] => {
    // TODO: 지금 반의 cs 만 모음
    // TODO: 학생 찾아냄
    // TODO: 그 학생의 다른 반 찾아냄

    const rowArray: ClassroomRow[] = classroomStudentArray
        .filter((classroomStudent) => classroomStudent.classroom_id === classroom_id)
        .map((classroomStudent) => {
            const student = studentArray.find((el) => el.id === classroomStudent.student_id)
            if (!student) throw ClientError.Unexpected("학생을 못 찾았어요")

            const otherClassroomArray: string[] = classroomStudentArray
                .filter((cs) => cs.student_id === student.id && cs.classroom_id !== classroom_id)
                .map((cs) => {
                    const targetClassroom = classroomArray.find((classroom) => classroom.id === cs.classroom_id)
                    if (!targetClassroom) throw ClientError.Unexpected("반을 못 찾았어요")
                    return targetClassroom.name
                })

            return {
                student_name: student.users.name,
                school_name: student.school.name,
                classroom_student_id: classroomStudent.id,
                other_classrooms: otherClassroomArray,
            }
        })

    return rowArray
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
    classroom: Classroom
}
const ClassroomTable = ({ classroom }: ClassroomTableProps) => {
    const loaderData = useLoaderData({ from: "/manage/student" })
    const { data: queryData } = useQuery(ManageStudentLoaderQueryOptions)
    const data = queryData ?? loaderData
    const rowArray = useMemo(
        () => convertDataToRowArray({ classroom_id: classroom.id, ...data }),
        [classroom, loaderData, queryData]
    )

    // eslint-disable-next-line react-hooks/incompatible-library
    const table = useReactTable({ data: rowArray, columns, getCoreRowModel: getCoreRowModel() })
    return <TanstackTable table={table} />
}

export default ClassroomTable
