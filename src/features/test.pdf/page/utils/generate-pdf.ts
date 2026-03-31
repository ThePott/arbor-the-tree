import { instance } from "@/packages/api/axiosInstances"
import { pdf } from "@react-pdf/renderer"
import MyDocument from "../react-pdf"
import { PAGE_COUNT_IN_BOOK } from "./constants"
import type { PdfInfo, TimeRecord } from "./types"

const getTypstPdf = async (multiplier: number): Promise<void> => {
    const response = await instance.get(`/test/pdf/typst`, {
        responseType: "blob",
        params: { multiplier },
    })
    const blob = response.data
    const url = URL.createObjectURL(blob)
    window.open(url)
}

const getPdfInfo = async (multiplier: number) => {
    const response = await instance.get(`/test/pdf/client`, {
        params: { multiplier },
    })
    return response.data as PdfInfo
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
            const pdfInfo = await getPdfInfo(multiplier)
            const blob = await pdf(MyDocument({ pdfInfo })).toBlob()
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
            const start = performance.now()
            const count = PAGE_COUNT_IN_BOOK * multiplier
            await getTypstPdf(multiplier)
            const end = performance.now()
            const time = end - start
            callback({ count, time, byWhat: "typst" })
            return
        }
        default:
            throw new Error("not supported")
    }
}
