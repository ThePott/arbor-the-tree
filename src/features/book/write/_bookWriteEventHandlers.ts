const useBookWriteEventHandler = () => {
    // const rowArray = useBookWriteStore((state) => state.rowArray)
    // const overlayingRowArray = useBookWriteStore((state) => state.overlayingRowArray)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // const data: BookDetail[] = rowArray
        //     .filter((row) => row.question_name)
        //     .map((row, rowIndex) => ({
        //         topic: row.topic && row.topic !== "/" ? row.topic : overlayingRowArray[rowIndex].topic,
        //         step: row.step && row.step !== "/" ? row.step : overlayingRowArray[rowIndex].step,
        //         question_name: row.question_name,
        //         question_page:
        //             row.question_page && row.question_page !== "/"
        //                 ? row.question_page
        //                 : overlayingRowArray[rowIndex].question_page,
        //         solution_page:
        //             row.solution_page && row.solution_page !== "/"
        //                 ? row.solution_page
        //                 : overlayingRowArray[rowIndex].solution_page,
        //         session: row.session && row.session !== "/" ? row.session : overlayingRowArray[rowIndex].session,
        //         sub_question_name: row.sub_question_name,
        //     }))

        //NOTE: 문제 번호에
        //NOTE: uncomment to debug
        // const body = { title, data }
        // console.log({ body })
        // debugger
    }

    return { handleSubmit }
}

export default useBookWriteEventHandler
