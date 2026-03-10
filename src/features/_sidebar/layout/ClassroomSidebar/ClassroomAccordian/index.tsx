import type { ExtendedStudent } from "@/features/manage.student/types"
import Button from "@/packages/components/Button/Button"
import ChevronButton from "@/packages/components/ChevronButton"
import ExpandableDiv from "@/packages/components/ExpandableDiv/ExpendableDiv"
import { Hstack, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import { getRouteApi, useLocation, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import type { ClassroomWithStudent } from ".."

const route = getRouteApi("/_sidebar")

type StudentButtonProps = {
    classroomId?: string
    student: ExtendedStudent
}
const StudentButton = ({ student, classroomId }: StudentButtonProps) => {
    const navigate = useNavigate()

    const { pathname } = useLocation()
    const searchParams = route.useSearch()

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.stopPropagation()

        const overridingParams = { student_id: student.id, classroom_id: classroomId }
        const newSearchParams =
            classroomId === searchParams.classroom_id ? { ...searchParams, ...overridingParams } : overridingParams
        navigate({
            to: pathname,
            search: newSearchParams,
        })
    }

    const { classroom_id: classroomInSearch, student_id: studentInSearch } = route.useSearch()
    const isSelected = classroomInSearch === classroomId && studentInSearch === student.id

    return (
        <Button
            color={isSelected ? "bg2" : "transparent"}
            border="onHover"
            isOnLeft
            onClick={handleClick}
            padding="wide"
        >
            {student.users.name}
        </Button>
    )
}

type ClassroomAccordianProps = {
    classroomWithStudent: ClassroomWithStudent
}
const ClassroomAccordian = ({ classroomWithStudent }: ClassroomAccordianProps) => {
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { classroom_id, student_id } = route.useSearch()

    const isSelected = classroom_id && classroom_id === classroomWithStudent.classroomId && !student_id
    const isChildrenSelected = classroom_id && classroom_id === classroomWithStudent.classroomId && student_id

    const handleClick = () => {
        if (!classroomWithStudent.classroomId) return

        navigate({
            to: pathname,
            search: { classroom_id: classroomWithStudent.classroomId },
        })
    }
    const [isOpened, setIsOpened] = useState(false)

    return (
        <RoundBox
            color={isSelected ? "bg2" : isChildrenSelected ? "bg0" : undefined}
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

                <ExpandableDiv animation="center">
                    {isOpened && (
                        <>
                            {classroomWithStudent.studentArray.map((student) => (
                                <StudentButton
                                    key={student.id}
                                    classroomId={classroomWithStudent.classroomId}
                                    student={student}
                                />
                            ))}
                        </>
                    )}
                </ExpandableDiv>
            </Vstack>
        </RoundBox>
    )
}

export default ClassroomAccordian
