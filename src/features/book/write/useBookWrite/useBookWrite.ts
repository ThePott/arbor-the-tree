import { withHeadInstance } from "@/packages/api/axiosInstances"
import { useMutation } from "@tanstack/react-query"
import useBookWriteStore from "../_bookWriteStore"
import type { BookDetail, BookWritePayload } from "../_bookWriteInterfaces"
import useGlobalStore from "@/shared/store/globalStore"

const useBookWriteMutation = () => {
    const postMutation = useMutation({
        mutationFn: async (body: BookWritePayload) => withHeadInstance.post("/book/write", body),
    })

    return { postMutation }
}

interface UseBookWriteEventHandlerProps {
    postFn: (body: BookWritePayload) => void
}

const useBookWriteEventHandler = ({ postFn }: UseBookWriteEventHandlerProps) => {
    const title = useBookWriteStore((state) => state.title)
    const publishedYear = useBookWriteStore((state) => state.publishedYear)
    const rowArray = useBookWriteStore((state) => state.rowArray)
    const overlayingRowArray = useBookWriteStore((state) => state.overlayingRowArray)
    const me = useGlobalStore((state) => state.me)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        if (!me) throw new Error("---- me missing")
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

        const body = { title, published_year: Number(publishedYear), data, user_id: me.id }
        postFn(body)
    }

    return { handleSubmit }
}

const useBookWrite = () => {
    const {
        postMutation: { mutate },
    } = useBookWriteMutation()
    const eventHandlerReturns = useBookWriteEventHandler({ postFn: (body) => mutate(body) })

    return { ...eventHandlerReturns }
}

export default useBookWrite
