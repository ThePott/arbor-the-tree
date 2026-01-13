import { Container, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import TabBar, { type Tab } from "@/packages/components/TabBar/TabBar"
import Title from "@/packages/components/Title/Title"

const MANAGE_STUDENT_TAB_ARRAY: Tab<string>[] = [
    { label: "반별", value: "classroom" },
    { label: "학생별", value: "student" },
]

const ManageStudentPage = () => {
    return (
        <Container width="xl" isPadded>
            <RoundBox radius="lg" padding="xl" isShadowed color="bg0">
                <Vstack gap="lg">
                    <Title as="h1">학생 관리</Title>
                    <TabBar variant="underline" tabArray={MANAGE_STUDENT_TAB_ARRAY} onSelect={() => {}} />
                </Vstack>
            </RoundBox>
        </Container>
    )
}

export default ManageStudentPage
