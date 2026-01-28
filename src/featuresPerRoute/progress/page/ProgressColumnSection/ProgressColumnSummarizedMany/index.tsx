import type { ConciseSession, ConciseSyllabus } from "@/featuresPerRoute/progress/types"
import { checkIsBeforeToday } from "@/shared/utils/dateManipulations"
import ProgressColumnSummarized from "./ProgressColumnSummarized"

const checkIsImportant = (session: ConciseSession): boolean => {
    const isCompletedRecently = Boolean(session.completed_at && !checkIsBeforeToday(session.completed_at))
    const isAssignedButNotCompleted = Boolean(session.assigned_at && !session.completed_at)
    return isCompletedRecently || isAssignedButNotCompleted
}

type FilterSyllabusArrayProps = {
    conciseSyllabusArray: ConciseSyllabus[]
    checkCondition: (conciseSession: ConciseSession) => boolean
}
const filterSyllabusArray = ({ conciseSyllabusArray, checkCondition }: FilterSyllabusArrayProps): ConciseSyllabus[] => {
    const filteredSyllabusArray = conciseSyllabusArray
        .map((syllabus) => ({
            ...syllabus,
            sessionsByTopicArray: syllabus.sessionsByTopicArray
                .map((sessionsByTopic) => ({
                    ...sessionsByTopic,
                    conciseSessionArray: sessionsByTopic.conciseSessionArray.filter((session) =>
                        checkCondition(session)
                    ),
                }))
                .filter((sessionsByTopic) => sessionsByTopic.conciseSessionArray.length > 0),
        }))
        .filter((syllabus) => syllabus.sessionsByTopicArray.length > 0)
    return filteredSyllabusArray
}

type ProgressColumnSummarizedProps = {
    conciseSyllabusArray: ConciseSyllabus[]
}
const ProgressColumnSummarizedMany = ({ conciseSyllabusArray }: ProgressColumnSummarizedProps) => {
    const importantSyllabusArray = filterSyllabusArray({ conciseSyllabusArray, checkCondition: checkIsImportant })
    const previousHomeworkSyllabusArray = filterSyllabusArray({
        conciseSyllabusArray: importantSyllabusArray,
        checkCondition: (session) =>
            Boolean(session.status === "HOMEWORK" && session.assigned_at && checkIsBeforeToday(session.assigned_at)),
    })
    const todaySyllabusArray = filterSyllabusArray({
        conciseSyllabusArray: importantSyllabusArray,
        checkCondition: (session) => session.status === "TODAY",
    })
    const newHomeworkSyllabusArray = filterSyllabusArray({
        conciseSyllabusArray: importantSyllabusArray,
        checkCondition: (session) =>
            Boolean(session.status === "HOMEWORK" && session.assigned_at && !checkIsBeforeToday(session.assigned_at)),
    })
    console.log("rerendered")

    return (
        <>
            <ProgressColumnSummarized title="전 숙제" conciseSyllabusArray={previousHomeworkSyllabusArray} />
            <ProgressColumnSummarized title="오늘" conciseSyllabusArray={todaySyllabusArray} />
            <ProgressColumnSummarized title="새 숙제" conciseSyllabusArray={newHomeworkSyllabusArray} />
        </>
    )
}

export default ProgressColumnSummarizedMany
