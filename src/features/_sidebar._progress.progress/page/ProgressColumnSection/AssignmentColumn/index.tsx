import { FlexOneContainer, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import AssignmentSession from "./AssignmentSession"

const AssginmentColumn = () => {
    return (
        <RoundBox isBordered color="bg0" className="h-full shrink-0 overflow-hidden">
            <Vstack className="h-full w-[300px]">
                <Title as="h3" className="px-my-lg pt-my-lg">
                    {conciseSyllabus.book.title}
                </Title>
                <FlexOneContainer isYScrollable className="px-my-lg pb-my-lg">
                    <AssignmentSession />
                    <AssignmentSession />
                    <AssignmentSession />
                    <AssignmentSession />
                </FlexOneContainer>
            </Vstack>
        </RoundBox>
    )
}

export default AssginmentColumn
