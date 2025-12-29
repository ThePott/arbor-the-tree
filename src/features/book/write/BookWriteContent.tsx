import Input from "@/packages/components/Input/Input"
import { Hstack, Vstack } from "@/packages/components/layouts"
import useBookWriteStore from "./_bookWriteStore"
import BWTopicStepSection from "./BWTopicStepSection/BWTopicStepSection"
import BWSubBookSection from "./BWSubBookSection/BWSubBookSection"
import BWTable from "./BWTable/BWTable"
import type { BookDetail } from "./_bookWriteInterfaces"

const BookWriteContent = () => {
    const title = useBookWriteStore((state) => state.title)
    const setTitle = useBookWriteStore((state) => state.setTitle)
    const rowArray = useBookWriteStore((state) => state.rowArray)
    const overlayingRowArray = useBookWriteStore((state) => state.overlayingRowArray)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data: BookDetail[] = rowArray
            .filter((row) => row.question_name)
            .map((row, rowIndex) => ({
                topic: row.topic && row.topic !== "/" ? row.topic : overlayingRowArray[rowIndex].topic,
                step: row.step && row.step !== "/" ? row.step : overlayingRowArray[rowIndex].step,
                question_name: row.question_name,
                question_page:
                    row.question_page && row.question_page !== "/"
                        ? row.question_page
                        : overlayingRowArray[rowIndex].question_page,
                solution_page:
                    row.solution_page && row.solution_page !== "/"
                        ? row.solution_page
                        : overlayingRowArray[rowIndex].solution_page,
                session: row.session && row.session !== "/" ? row.session : overlayingRowArray[rowIndex].session,
                sub_question_name: row.sub_question_name,
            }))

        //NOTE: 문제 번호에
        //NOTE: uncomment to debug
        const body = { title, data }
        console.log({ body })
        debugger
    }

    return (
        <form className="h-full w-full" onSubmit={handleSubmit}>
            <Hstack gap="xl" className="p-my-xl h-full w-full">
                <Vstack className="w-[400px]">
                    <Input
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        variant="ghost"
                        className="text-my-xl"
                        placeholder="문제집 제목을 입력하세요"
                    />
                    <BWTopicStepSection />
                    <BWSubBookSection />
                </Vstack>
                <BWTable />
            </Hstack>
        </form>
    )
}

export default BookWriteContent
