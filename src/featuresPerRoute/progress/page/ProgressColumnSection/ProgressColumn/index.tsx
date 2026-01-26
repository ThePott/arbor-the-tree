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
            <Vstack className="h-full overflow-hidden w-[300px]">
                <Title as="h3" isMuted className="px-my-lg pt-my-lg">
                    {conciseSyllabus.book.title}
                </Title>
                <FlexOneContainer isYScrollable className="px-my-lg pb-my-lg">
                    <Vstack gap="md">
                        {conciseSyllabus.sessionsByTopicArray.map((sessionsByTopic) => (
                            <>
                                <Title as="h3" className="sticky top-0 bg-bg-0 text-center text-wrap">
                                    {sessionsByTopic.title}
                                </Title>
                                {sessionsByTopic.conciseSessionArray.map((conciseSession) => (
                                    <ProgressSession conciseSession={conciseSession} />
                                ))}
                            </>
                        ))}
                    </Vstack>
                </FlexOneContainer>
            </Vstack>
        </RoundBox>
    )
}

export default ProgressColumn
