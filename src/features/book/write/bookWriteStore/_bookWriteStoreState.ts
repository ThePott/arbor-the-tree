import type { Tab } from "@/packages/components/TabBar/TabBar"
import type { BookWriteRow, BWTopicStep } from "../_bookWriteInterfaces"
import type { BookWriteSchema } from "../_bookWriteSchema"
import type { FieldErrors, UseFormRegister } from "react-hook-form"

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

    register: UseFormRegister<BookWriteSchema> | null
    setRegister: (register: UseFormRegister<BookWriteSchema> | null) => void
    errors: FieldErrors<BookWriteSchema> | null
    setErrors: (errors: FieldErrors<BookWriteSchema> | null) => void
}
