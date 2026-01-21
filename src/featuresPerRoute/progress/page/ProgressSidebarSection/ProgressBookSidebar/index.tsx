import Button from "@/packages/components/Button/Button"
import { Hstack, Vstack } from "@/packages/components/layouts"
import LocalAutoComplete from "@/packages/components/LocalAutoComplete"
import Title from "@/packages/components/Title/Title"
import type { ValueLabel } from "@/shared/interfaces"
import { getRouteApi, useLoaderData } from "@tanstack/react-router"
import { Plus } from "lucide-react"

const route = getRouteApi("/progress/")

const ProgressBookSidebar = () => {
    const { studentArray, classroomArray, bookArray } = useLoaderData({ from: "/progress/" })
    const { student: studentInParams, classroom: classroomInParams } = route.useSearch()

    const classroom = classroomArray.find((el) => el.id === classroomInParams)
    const student = studentArray.find((el) => el.id === studentInParams)
    const title = [classroom?.name, student?.users.name].filter((value) => value).join(" / ")

    const optionArray: ValueLabel[] = bookArray.map((book) => ({ value: book.id, label: book.title }))

    return (
        <Vstack>
            <Title as="h3">{title}</Title>
            <Hstack gap="xs">
                <LocalAutoComplete
                    optionArray={optionArray}
                    isRed={false}
                    onChange={() => {}}
                    placeholder="문제집 이름"
                />
                <Button color="green">
                    <Plus />
                </Button>
            </Hstack>
        </Vstack>
    )
}

export default ProgressBookSidebar
