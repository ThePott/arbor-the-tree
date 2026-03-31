import NotoSerifKR from "@/assets/NotoSerifKR-VariableFont_wght.ttf"
import { ClientError } from "@/shared/error/clientError"
import { Document, Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer"
import type { PdfInfo, QuestionForPdf } from "../utils/types"

Font.register({
    family: "Noto Serif",
    src: NotoSerifKR,
})

const styles = StyleSheet.create({
    page: {
        fontFamily: "Noto Serif",
        padding: 40,
        fontSize: 10,
        flexDirection: "column",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    headerLeft: {
        flexDirection: "column",
    },
    headerRight: {
        flexDirection: "column",
        alignItems: "flex-end",
    },
    bookTitle: {
        fontSize: 12,
    },
    topicTitle: {
        fontSize: 16,
        fontWeight: "semibold",
    },
    dateText: {
        fontSize: 12,
    },
    studentName: {
        fontSize: 14,
    },
    questionBox: {
        marginTop: 10,
        marginBottom: 10,
    },
    questionRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    indexText: {
        fontWeight: "semibold",
        width: 30,
    },
    pageText: {
        marginLeft: 20,
        width: 60,
    },
    nameText: {
        width: 80,
    },
    repeatText: {
        width: 60,
    },
    solutionText: {
        flex: 1,
        textAlign: "right",
    },
    answerGrid: {
        flexDirection: "row",
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: "#C0C0C0",
    },
    answerLabel: {
        fontSize: 8,
        color: "gray",
        width: 30,
    },
    answerLine: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#C0C0C0",
        marginLeft: 10,
    },
})

type AssignmentInfo = {
    id: string
    studentName: string
    dateString: string
}

type QuestionData = {
    index: number
    page: number
    name: string
    repeat_count: number
    solution_page: number
}
type QuestionBoxProps = { questionData: QuestionData }
const QuestionBox = ({ questionData }: QuestionBoxProps) => {
    const { index, page, name, repeat_count, solution_page } = questionData

    return (
        <View style={styles.questionBox}>
            <View style={styles.questionRow}>
                <Text style={styles.indexText}>{index}</Text>
                <Text style={styles.pageText}>
                    {page} 쪽 {name} 번
                </Text>
                <Text style={styles.repeatText}>R {repeat_count}</Text>
                <Text style={styles.solutionText}>(답지 {solution_page} 쪽)</Text>
            </View>
            <View style={styles.answerGrid}>
                {["H", "D", "C", "M", "K"].map((char) => (
                    <View key={char} style={{ flexDirection: "row", marginRight: 20 }}>
                        <Text style={styles.answerLabel}>{char}</Text>
                        <View style={styles.answerLine} />
                    </View>
                ))}
            </View>
        </View>
    )
}

type AssignmentPageManyProps = {
    bookTitle: string
    topicTitle: string
    id: string
    studentName: string
    dateString: string
    questionDataArray: QuestionData[]
    startIndex: number
}
const AssignmentPageMany = ({
    bookTitle,
    topicTitle,
    id,
    studentName,
    dateString,
    questionDataArray,
    startIndex,
}: AssignmentPageManyProps) => {
    const pageLength = Math.ceil(questionDataArray.length / 2)
    const pages: QuestionData[][] = []

    for (let i = 0; i < pageLength; i++) {
        const first = questionDataArray[i * 2]
        const second = questionDataArray[i * 2 + 1]
        pages.push([
            first ? { ...first, index: startIndex + i * 2 + 1 } : ({} as QuestionData),
            second ? { ...second, index: startIndex + i * 2 + 2 } : ({} as QuestionData),
        ])
    }

    return (
        <>
            {pages.map((pageQuestions, pageIndex) => (
                <Page key={pageIndex} size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <View style={styles.headerLeft}>
                            <Text style={styles.bookTitle}>{bookTitle}</Text>
                            <Text style={styles.topicTitle}>{topicTitle}</Text>
                        </View>
                        <View style={styles.headerRight}>
                            <Text style={styles.dateText}>
                                {dateString} / id: {id}
                            </Text>
                            <Text>asdf</Text>
                            <Text>가나다라</Text>
                            <Text>asdf</Text>
                            <Text>가나다라</Text>
                            <Text>asdf</Text>
                            <Text>가나다라</Text>
                            <Text>asdf</Text>
                            <Text>가나다라</Text>
                            <Text style={styles.studentName}>{studentName}</Text>
                        </View>
                    </View>

                    {pageQuestions[0]?.index && <QuestionBox questionData={pageQuestions[0]} />}
                    {pageQuestions[1]?.index && <QuestionBox questionData={pageQuestions[1]} />}
                </Page>
            ))}
        </>
    )
}

type HandoutPerTopicProps = {
    assignmentInfo: AssignmentInfo
    startIndex: number
    bookTitle: string
    topicTitle: string
    questions: QuestionForPdf[]
}
const HandoutPerTopic = ({ assignmentInfo, startIndex, bookTitle, topicTitle, questions }: HandoutPerTopicProps) => {
    const { studentName, dateString, id } = assignmentInfo
    const condensedQuestionArray = questions.map((questionData) => ({
        index: 0,
        page: questionData.page,
        name: questionData.name,
        repeat_count: questionData.repeat_count,
        solution_page: questionData.solution_page,
    }))

    return (
        <AssignmentPageMany
            bookTitle={bookTitle}
            topicTitle={topicTitle}
            id={id}
            studentName={studentName}
            dateString={dateString}
            questionDataArray={condensedQuestionArray}
            startIndex={startIndex}
        />
    )
}

type HandoutPerBookProps = {
    assignmentInfo: AssignmentInfo
    bookForPdf: PdfInfo["bookForPdfArray"][number]
}
const HandoutPerBook = ({ assignmentInfo, bookForPdf }: HandoutPerBookProps) => {
    const questionLengthArray = bookForPdf.topics.map((topic) => topic.questions.length)
    const startIndexArray = questionLengthArray.reduce((acc: number[], _, index) => {
        const lastStartIndex = acc.at(-1)
        if (!lastStartIndex) return [0]

        const previousQuestionLength = questionLengthArray[index - 1]
        if (!previousQuestionLength) throw ClientError.Unexpected("PDF 생성 중 오류가 발생했어요")

        const newStartIndex = lastStartIndex + previousQuestionLength
        return [...acc, newStartIndex]
    }, [])

    // NOTE: 테스트로 받는 데이터에서는 topic.id가 모두 1이어서 key로 사용할 수 없다
    // NOTE: 만약 이걸 실제 데이터에서 사용할 거려면 topic.id만 해야 함
    return (
        <>
            {bookForPdf.topics.map((topic, index) => (
                <HandoutPerTopic
                    key={`${topic.id}-${index}`}
                    assignmentInfo={assignmentInfo}
                    bookTitle={bookForPdf.title}
                    startIndex={startIndexArray[index]}
                    topicTitle={topic.title}
                    questions={topic.questions}
                />
            ))}
        </>
    )
}

type MyDocumentProps = { pdfInfo: PdfInfo }
const MyDocument = ({ pdfInfo: { id, studentName, assigned_at, bookForPdfArray } }: MyDocumentProps) => {
    const assignmentInfo: AssignmentInfo = {
        id,
        studentName,
        dateString: assigned_at.slice(0, 10),
    }
    return (
        <Document>
            {bookForPdfArray.map((book) => (
                <HandoutPerBook key={book.id} assignmentInfo={assignmentInfo} bookForPdf={book} />
            ))}
        </Document>
    )
}

export default MyDocument
