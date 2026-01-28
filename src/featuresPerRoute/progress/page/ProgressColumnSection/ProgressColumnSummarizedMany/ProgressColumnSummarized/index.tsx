import type { ConciseSyllabus } from "@/featuresPerRoute/progress/types"
import { FlexOneContainer, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import ProgressSession from "../../ProgressColumn/ProgressSession"

type ProgressColumnSummarizedProps = {
    conciseSyllabusArray: ConciseSyllabus[]
    title: string
}
const ProgressColumnSummarized = ({ conciseSyllabusArray, title }: ProgressColumnSummarizedProps) => {
    return (
        <RoundBox isBordered color="bg0" className="h-full overflow-hidden shrink-0">
            <Vstack className="h-full overflow-hidden w-[300px]">
                <Title as="h3" className="px-my-lg pt-my-lg">
                    {title}
                </Title>
                <FlexOneContainer isYScrollable className="px-my-lg pb-my-lg">
                    <Vstack gap="md">
                        {conciseSyllabusArray.map((conciseSyllabus) => (
                            <Vstack key={conciseSyllabus.id} gap="none">
                                <Title as="h3" className="sticky top-0 bg-bg-0 text-center text-wrap">
                                    {conciseSyllabus.book.title}
                                </Title>
                                {conciseSyllabus.sessionsByTopicArray.map((sessionsByTopic) => (
                                    <Vstack gap="none">
                                        <Title as="h3" className="bg-bg-0 text-wrap" isMuted>
                                            {sessionsByTopic.title}
                                        </Title>
                                        {sessionsByTopic.conciseSessionArray.map((conciseSession) => (
                                            <ProgressSession
                                                syllabus_id={conciseSyllabus.id}
                                                startingTopicTitle={sessionsByTopic.title}
                                                conciseSession={conciseSession}
                                            />
                                        ))}
                                    </Vstack>
                                ))}
                            </Vstack>
                        ))}
                    </Vstack>
                </FlexOneContainer>
            </Vstack>
        </RoundBox>
    )
}

export default ProgressColumnSummarized
