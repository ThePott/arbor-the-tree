import { FlexOneContainer, Vstack } from "@/packages/components/layouts"
import Title from "@/packages/components/Title/Title"
import ResponsiveContainer from "@/shared/components/ResponsiveContainer"
import ManageDeleteTable from "./ManageDeleteTable"

const ManageDeletePage = () => {
    return (
        <FlexOneContainer isYScrollable className="h-full [scrollbar-gutter:stable]">
            <ResponsiveContainer width="lg">
                <Vstack gap="lg">
                    <Title as="h1">권한 삭제</Title>
                    <ManageDeleteTable />
                </Vstack>
            </ResponsiveContainer>
        </FlexOneContainer>
    )
}

export default ManageDeletePage
