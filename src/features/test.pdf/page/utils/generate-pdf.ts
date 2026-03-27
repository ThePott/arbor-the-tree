import { instance } from "@/packages/api/axiosInstances"
import { pdf } from "@react-pdf/renderer"
import MyDocument from "../react-pdf"
import { PAGE_COUNT_IN_BOOK } from "./constants"
import type { TimeRecord } from "./types"

const getTypstPdf = async (multiplier: number): Promise<{ count: number; time: number }> => {
    const start = performance.now()

    const response = await instance.get(`/test/pdf`, {
        responseType: "blob",
        params: { multiplier },
    })
    const blob = response.data
    const url = URL.createObjectURL(blob)
    window.open(url)

    const end = performance.now()
    const time = end - start
    return { count: multiplier * PAGE_COUNT_IN_BOOK, time }
}

type GeneratePdfProps = {
    multiplier: number
    byWhat: string
    callback: ({ byWhat, count, time }: TimeRecord) => void
}
export const generatePdf = async ({ multiplier, byWhat, callback }: GeneratePdfProps): Promise<void> => {
    switch (byWhat) {
        case "reactPdfDefault": {
            const start = performance.now()
            const count = PAGE_COUNT_IN_BOOK * multiplier
            const blob = await pdf(MyDocument({ count })).toBlob()
            const url = URL.createObjectURL(blob)
            window.open(url)
            const end = performance.now()
            const time = end - start
            callback({ count, time, byWhat: "reactPdfDefault" })
            return
        }
        case "reactPdfWithWebWorker":
            return
        case "typst": {
            const { count, time } = await getTypstPdf(multiplier)
            callback({ count, time, byWhat: "typst" })
            return
        }
        default:
            throw new Error("not supported")
    }
}
