import type { ConciseSyllabus } from "@/featuresPerRoute/progress/types"
import { FlexOneContainer, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import ProgressSession from "./ProgressSession"

type ProgressColumnProps = {
    conciseSyllabus: ConciseSyllabus
}
const ProgressColumn = ({ conciseSyllabus }: ProgressColumnProps) => {
    return (
        <RoundBox isBordered color="bg0" className="h-full overflow-hidden shrink-0">
            <Vstack className="h-full overflow-hidden">
                <Title as="h3" isMuted className="px-my-lg pt-my-lg">
                    {conciseSyllabus.book.title}
                </Title>
                <FlexOneContainer isYScrollable className="px-my-lg pb-my-lg">
                    <Vstack gap="md">
                        {conciseSyllabus.sessions.map((conciseSession) => (
                            <ProgressSession conciseSession={conciseSession} />
                        ))}
                    </Vstack>
                </FlexOneContainer>
            </Vstack>
        </RoundBox>
    )
}

export default ProgressColumn
