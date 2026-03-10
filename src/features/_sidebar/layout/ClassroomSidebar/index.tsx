import type { ExtendedStudent } from "@/features/manage.student/types"
import { Vstack } from "@/packages/components/layouts"
import Title from "@/packages/components/Title/Title"
import { ClientError } from "@/shared/error/clientError"
import type { Classroom, ClassroomStudent } from "@/shared/interfaces"
import { useLoaderData, useLocation } from "@tanstack/react-router"
import ClassroomAccordian from "./ClassroomAccordian"

type GroupByClassroomProps = {
    studentArray: ExtendedStudent[]
    classroomArray: Classroom[]
    classroomStudentArray: ClassroomStudent[]
}
export type ClassroomWithStudent = {
    classroomId?: string
    classroomName: string
    studentArray: ExtendedStudent[]
}
type GroupByClassroomReturns = {
    isolatedStudentArray: ExtendedStudent[]
    classroomWithStudentArray: ClassroomWithStudent[]
}
const groupByClassroom = ({
    studentArray,
    classroomArray,
    classroomStudentArray,
}: GroupByClassroomProps): GroupByClassroomReturns => {
    const isolatedStudentArray: ExtendedStudent[] = studentArray.filter((student) => {
        const index = classroomStudentArray.findIndex((classroomStudent) => classroomStudent.student_id === student.id)
        return index === -1
    })

    const classroomWithStudentArray: ClassroomWithStudent[] = classroomArray.map((classroom) => {
        const filteredStudentArray = classroomStudentArray
            .filter((classroomStudent) => classroomStudent.classroom_id === classroom.id)
            .map((classroomStudent) => {
                const student = studentArray.find((el) => el.id === classroomStudent.student_id)
                if (!student) throw ClientError.Unexpected("학생을 못 찾았어요")
                return student
            })
        const classroomWithStudent = {
            classroomId: classroom.id,
            classroomName: classroom.name,
            studentArray: filteredStudentArray,
        }
        return classroomWithStudent
    })

    return { isolatedStudentArray, classroomWithStudentArray }
}

const pathnameToTitleText: Record<string, string> = {
    "/progress": "진도표",
    "/check": "오답 체크",
    "/assignment": "오답 과제 목록",
    "/assignment/create": "오답 과제 생성",
}

const ClassroomSidebar = () => {
    const { extendedStudentArray } = useLoaderData({ from: "/_sidebar" })
    const { classroomWithStudentArray, isolatedStudentArray } = groupByClassroom(extendedStudentArray)

    const { pathname } = useLocation()
    const titleText = pathnameToTitleText[pathname]

    return (
        <Vstack className="overflow-y-auto p-my-lg pr-0 w-[200px]" gap="sm">
            <Title as="h1" isMuted>
                {titleText}
            </Title>
            {classroomWithStudentArray.map((classroomWithStudent) => (
                <ClassroomAccordian
                    key={classroomWithStudent.classroomId}
                    classroomWithStudent={classroomWithStudent}
                />
            ))}
            {isolatedStudentArray.length > 0 && (
                <ClassroomAccordian
                    classroomWithStudent={{
                        classroomName: "개별 진도",
                        studentArray: isolatedStudentArray,
                    }}
                />
            )}
        </Vstack>
    )
}

export default ClassroomSidebar
