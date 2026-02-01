import { Container, Vstack } from "@/packages/components/layouts"
import TabBar, { type Tab } from "@/packages/components/TabBar/TabBar"
import Title from "@/packages/components/Title/Title"
import { debugRender } from "@/shared/config/debug/"
import { getRouteApi, useNavigate } from "@tanstack/react-router"
import type { ManageStudentSearch } from "../types"
import ByClassroomSection from "./ByClassroomSection"
import ByStudentSection from "./ByStudentSection"

const MANAGE_STUDENT_TAB_ARRAY: Tab<ManageStudentSearch>[] = [
    { label: "반별", value: "classroom" },
    { label: "학생별", value: "student" },
]

const routeApi = getRouteApi("/manage/student")
const ManageStudentPage = () => {
    debugRender("ManageStudentPage")
    const navigate = useNavigate({ from: "/manage/student" })

    const { by } = routeApi.useSearch()

    return (
        <Container width="xl" isPadded>
            <Vstack gap="lg">
                <Title as="h1">학생 관리</Title>
                <TabBar
                    variant="underline"
                    tabArray={MANAGE_STUDENT_TAB_ARRAY}
                    onSelect={(tab) => {
                        navigate({ search: { by: tab.value } })
                    }}
                />

                {by !== "student" && <ByClassroomSection />}
                {by === "student" && <ByStudentSection />}
            </Vstack>
        </Container>
    )
}

export default ManageStudentPage
