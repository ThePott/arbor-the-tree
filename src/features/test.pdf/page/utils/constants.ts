import type { ValueLabel } from "@/shared/interfaces"

export const PAGE_COUNT_IN_BOOK = 8
export const MULTIPLIER_ARRAY = [1, 10, 100, 1000]

export const TAB_ARRAY: ValueLabel[] = [
    { value: "reactPdfDefault", label: "(A) `react-pdf/renderer`" },
    { value: "reactPdfWithWebWorker", label: "(B) `react-pdf/renderer` with web worker" },
    { value: "typst", label: "(C) compile typst to pdf" },
]
export const BY_WHAT_ARRAY = TAB_ARRAY.map(({ value }) => value)
export const BY_WHAT_LABEL_ARRAY = TAB_ARRAY.map(({ label }) => label)

export const PAGE_LABEL_ARRAY = [
    `${PAGE_COUNT_IN_BOOK * 1}쪽`,
    `${PAGE_COUNT_IN_BOOK * 10}쪽`,
    `${PAGE_COUNT_IN_BOOK * 100}쪽`,
    `${PAGE_COUNT_IN_BOOK * 1000}쪽`,
]
