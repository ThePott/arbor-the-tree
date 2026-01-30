import type { ExtendedStudent } from "@/featuresPerRoute/manage.student/types"
import Button from "@/packages/components/Button/Button"
import ChevronButton from "@/packages/components/ChevronButton"
import { Hstack, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import { getRouteApi, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import type { ClassroomWithStudent } from ".."

const route = getRouteApi("/progress/")

type StudentButtonProps = {
    classroomId?: string
    student: ExtendedStudent
}
const StudentButton = ({ student, classroomId }: StudentButtonProps) => {
    const navigate = useNavigate({ from: "/progress/" })

    const searchParams = route.useSearch()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation()

        const overridingParams = { student_id: student.id, classroom_id: classroomId }
        const newSearchParams =
            classroomId === searchParams.classroom_id ? { ...searchParams, ...overridingParams } : overridingParams
        navigate({
            search: newSearchParams,
        })
    }

    const { classroom_id: classroomInSearch, student_id: studentInSearch } = route.useSearch()
    const isSelected = classroomInSearch === classroomId && studentInSearch === student.id

    return (
        <Button color={isSelected ? "bg2" : "black"} isBorderedOnHover isOnLeft onClick={handleClick}>
            {student.users.name}
        </Button>
    )
}

type ProgressClassroomAccordianProps = {
    classroomWithStudent: ClassroomWithStudent
}
const ProgressClassroomAccordian = ({ classroomWithStudent }: ProgressClassroomAccordianProps) => {
    const navigate = useNavigate({ from: "/progress/" })
    const { classroom_id, student_id } = route.useSearch()

    const isSelected = classroom_id && classroom_id === classroomWithStudent.classroomId && !student_id

    const handleClick = () => {
        if (!classroomWithStudent.classroomId) return

        navigate({ search: { classroom_id: classroomWithStudent.classroomId } })
    }
    const [isOpened, setIsOpened] = useState(false)

    // NOTE: color="black"은 스타일 설정이 안 되어 있어서 투명한 색으로 나온다
    return (
        <RoundBox
            color={isSelected ? "bg2" : undefined}
            padding="md"
            isBordered
            onClick={handleClick}
            className="my-transition hover:outline-2 cursor-pointer"
        >
            <Vstack gap="none">
                <Hstack gap="xs" className="items-start">
                    <ChevronButton isOpened={isOpened} setIsOpened={setIsOpened} />
                    <Title as="h2">{classroomWithStudent.classroomName}</Title>
                </Hstack>

                {classroomWithStudent.studentArray.map((student) => (
                    <StudentButton key={student.id} classroomId={classroomWithStudent.classroomId} student={student} />
                ))}
            </Vstack>
        </RoundBox>
    )
}

export default ProgressClassroomAccordian
