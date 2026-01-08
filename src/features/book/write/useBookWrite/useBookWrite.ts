import { withHeadInstance } from "@/packages/api/axiosInstances"
import { useMutation } from "@tanstack/react-query"
import type { BookWriteRowFlat, BookWritePayload } from "../_bookWriteInterfaces"
import useGlobalStore from "@/shared/store/globalStore"
import useBookWriteStore from "../bookWriteStore/bookWriteStore"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { bookWriteSchema, type BookWriteSchemaInfer } from "../_bookWriteSchema"
import { useEffect } from "react"

const useBookWriteMutation = () => {
    const setIsPending = useBookWriteStore((state) => state.setIsPending)
    const setModalKey = useBookWriteStore((state) => state.setModalKey)
    const postMutation = useMutation({
        mutationFn: async (body: BookWritePayload) => withHeadInstance.post("/book/write", body),
    })

    useEffect(() => {
        setIsPending(postMutation.isPending)
    }, [postMutation.isPending])

    useEffect(() => {
        if (!postMutation.isSuccess) return
        setModalKey("success")
    }, [postMutation.isSuccess])
    useEffect(() => {
        if (!postMutation.isError) return
        setModalKey("error")
    }, [postMutation.isError])

    return { postMutation }
}

interface UseBookWriteEventHandlerProps {
    postFn: (body: BookWritePayload) => void
}
const useBookWriteEventHandler = ({ postFn }: UseBookWriteEventHandlerProps) => {
    const rowArray = useBookWriteStore((state) => state.rowArray)
    const me = useGlobalStore((state) => state.me)
    const setRegister = useBookWriteStore((state) => state.setRegister)
    const setErrors = useBookWriteStore((state) => state.setErrors)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(bookWriteSchema) })

    useEffect(() => {
        setRegister(register)
    }, [register])
    useEffect(() => {
        setErrors(errors)
    }, [errors])

    const onSubmit = (formData: BookWriteSchemaInfer) => {
        if (!me) throw new Error("---- me missing")

        const data: BookWriteRowFlat[] = rowArray
            .filter((row) => row.question_name.value)
            .map((row) => ({
                topic: row.topic.overlaying || row.topic.value,
                step: row.step.overlaying || row.step.value,
                question_name: row.question_name.value,
                question_page: row.question_page.overlaying || row.question_page.value,
                solution_page: row.solution_page.overlaying || row.solution_page.value,
                session: row.session.overlaying || row.session.value,
            }))

        // NOTE: Sending user id as prop is TEMPORARY SOLUTION
        // TODO: MUST EXCLUDE USER ID IN THE FUTURE
        const body = { ...formData, data, user_id: me.id }
        const isError = rowArray.some((row) => Object.entries(row).some(([_, cell]) => cell.isError))
        if (isError) {
            // TODO: 모달로 교체해야 함
            window.alert("올바른 형식으로 문제 정보를 기입해주세요")
            return
        }
        postFn(body)
    }

    const wrappedHandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        handleSubmit(onSubmit)(event)
    }

    return { wrappedHandleSubmit, register, errors, handleSubmit, onSubmit }
}

const useBookWrite = () => {
    const {
        postMutation: { mutate },
    } = useBookWriteMutation()
    const eventHandlerReturns = useBookWriteEventHandler({ postFn: (body) => mutate(body) })

    return { ...eventHandlerReturns }
}

export default useBookWrite
