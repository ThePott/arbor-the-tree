import type { SyllabusWithSessions } from "@/features/_sidebar._assigned._progress.progress/types"
import { Vstack } from "@/packages/components/layouts"
import Title from "@/packages/components/Title/Title"
import ColumnWithBoxes from "../ColumnWithBoxes"
import ProgressSession from "./ProgressSession"

type ProgressColumnProps = {
    conciseSyllabus: SyllabusWithSessions
}
const ProgressColumn = ({ conciseSyllabus }: ProgressColumnProps) => {
    return (
        <ColumnWithBoxes>
            <ColumnWithBoxes.Title>{conciseSyllabus.book.title}</ColumnWithBoxes.Title>
            <ColumnWithBoxes.Content>
                {conciseSyllabus.sessionsByTopicArray.map((sessionsByTopic) => (
                    <Vstack key={sessionsByTopic.title} gap="none">
                        <Title as="h3" className="sticky top-0 bg-bg-0 text-center text-wrap" isMuted>
                            {sessionsByTopic.title}
                        </Title>
                        {sessionsByTopic.conciseSessionArray.map((conciseSession) => (
                            <ProgressSession
                                key={conciseSession.id}
                                syllabus_id={conciseSyllabus.id}
                                startingTopicTitle={sessionsByTopic.title}
                                conciseSession={conciseSession}
                            />
                        ))}
                    </Vstack>
                ))}
            </ColumnWithBoxes.Content>
        </ColumnWithBoxes>
    )
}

export default ProgressColumn
