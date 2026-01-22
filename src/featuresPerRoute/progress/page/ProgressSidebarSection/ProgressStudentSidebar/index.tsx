import type { ExtendedStudent } from "@/featuresPerRoute/manage.student/types"
import Button from "@/packages/components/Button/Button"
import { Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import { ClientError } from "@/shared/error/clientError"
import type { Classroom, ClassroomStudent } from "@/shared/interfaces"
import { getRouteApi, useLoaderData, useNavigate } from "@tanstack/react-router"

type GroupByClassroomProps = {
    studentArray: ExtendedStudent[]
    classroomArray: Classroom[]
    classroomStudentArray: ClassroomStudent[]
}
type ClassroomWithStudent = {
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

type StudentButtonProps = {
    classroomId?: string
    student: ExtendedStudent
}
const StudentButton = ({ student, classroomId }: StudentButtonProps) => {
    const navigate = useNavigate({ from: "/progress/" })
    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation()
        navigate({ search: { student: student.id, classroom: classroomId } })
    }

    const { classroom: classroomInSearch, student: studentInSearch } = route.useSearch()
    const isSelected = classroomInSearch === classroomId && studentInSearch === student.id

    return (
        <Button color={isSelected ? "bg2" : "black"} isBorderedOnHover isOnLeft onClick={handleClick}>
            {student.users.name}
        </Button>
    )
}

const route = getRouteApi("/progress/")
type ProgressClassroomAccordianProps = {
    classroomWithStudent: ClassroomWithStudent
}
const ProgressClassroomAccordian = ({ classroomWithStudent }: ProgressClassroomAccordianProps) => {
    const navigate = useNavigate({ from: "/progress/" })
    const { classroom, student } = route.useSearch()

    const isSelected = classroom && classroom === classroomWithStudent.classroomId && !student

    // NOTE: color="black"은 스타일 설정이 안 되어 있어서 투명한 색으로 나온다
    return (
        <RoundBox
            color={isSelected ? "bg2" : undefined}
            padding="md"
            isBordered
            onClick={() => navigate({ search: { classroom: classroomWithStudent.classroomId } })}
            className="my-transition hover:outline-2 cursor-pointer"
        >
            <Vstack gap="none">
                <Title as="h2">{classroomWithStudent.classroomName}</Title>
                {classroomWithStudent.studentArray.map((student) => (
                    <StudentButton key={student.id} classroomId={classroomWithStudent.classroomId} student={student} />
                ))}
            </Vstack>
        </RoundBox>
    )
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
