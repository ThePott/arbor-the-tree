import type { ExtendedStudent } from "@/featuresPerRoute/manage.student/types"
import { Vstack } from "@/packages/components/layouts"
import { ClientError } from "@/shared/error/clientError"
import type { Classroom, ClassroomStudent } from "@/shared/interfaces"
import { useLoaderData } from "@tanstack/react-router"
import ProgressClassroomAccordian from "./ProgressClassroomAccordian"

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

const ProgressStudentSidebar = () => {
    const loaderData = useLoaderData({ from: "/progress/" })
    const { classroomWithStudentArray, isolatedStudentArray } = groupByClassroom(loaderData)

    return (
        <Vstack>
            {classroomWithStudentArray.map((classroomWithStudent) => (
                <ProgressClassroomAccordian
                    key={classroomWithStudent.classroomId}
                    classroomWithStudent={classroomWithStudent}
                />
            ))}
            {isolatedStudentArray.length > 0 && (
                <ProgressClassroomAccordian
                    classroomWithStudent={{
                        classroomName: "개별 진도",
                        studentArray: isolatedStudentArray,
                    }}
                />
            )}
        </Vstack>
    )
}

export default ProgressStudentSidebar
