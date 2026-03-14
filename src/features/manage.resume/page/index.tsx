import { FlexOneContainer, Vstack } from "@/packages/components/layouts"
import Title from "@/packages/components/Title/Title"
import ResponsiveContainer from "@/shared/components/ResponsiveContainer"
import ManageResumeTable from "./ManageResumeTable"

const ManageResumePage = () => {
    return (
        <FlexOneContainer isYScrollable className="h-full [scrollbar-gutter:stable]">
            <ResponsiveContainer width="lg">
                <Vstack gap="lg">
                    <Title as="h1">권한 요청 현황</Title>
                    <ManageResumeTable />
                </Vstack>
            </ResponsiveContainer>
        </FlexOneContainer>
    )
}

export default ManageResumePage
