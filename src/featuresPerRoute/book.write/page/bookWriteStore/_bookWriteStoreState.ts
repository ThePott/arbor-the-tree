import type { Tab } from "@/packages/components/TabBar/TabBar"
import type { ApiError } from "@/shared/interfaces"
import type { AxiosError } from "axios"
import type { FieldErrors, UseFormRegister } from "react-hook-form"
import type { BookWriteModalKey, BookWriteRow, BWTopicStep } from "../_bookWriteInterfaces"
import type { BookWriteSchemaInput } from "../_bookWriteSchema"

export interface BookWriteStoreState {
    title: string
    setTitle: (title: string) => void
    publishedYear: number | undefined
    setPublishedYear: (publishedYear: number) => void

    selectedTab: Tab<BWTopicStep>
    setSelectedTab: (selectedTab: Tab<BWTopicStep>) => void

    topicArray: string[]
    stepArray: string[]
    topicInfo: string
    setTopicInfo: (topicInfo: string) => void
    stepInfo: string
    setStepInfo: (stepInfo: string) => void

    subBookTitle: string | null
    setSubBookTitle: (subBookTitle: string | null) => void

    rowArray: BookWriteRow[]
    updateRowArray: (rowIndex: number, columnKey: keyof BookWriteRow, value: string) => void

    register: UseFormRegister<BookWriteSchemaInput> | null
    setRegister: (register: UseFormRegister<BookWriteSchemaInput> | null) => void
    errors: FieldErrors<BookWriteSchemaInput> | null
    setErrors: (errors: FieldErrors<BookWriteSchemaInput> | null) => void

    isPending: boolean
    setIsPending: (isPending: boolean) => void

    mutationError: AxiosError<ApiError> | null
    setMutationError: (mutationError: AxiosError<ApiError> | null) => void

    modalKey: BookWriteModalKey | null
    setModalKey: (modalKey: BookWriteModalKey | null) => void
}
