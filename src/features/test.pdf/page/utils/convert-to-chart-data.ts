import { BY_WHAT_ARRAY, BY_WHAT_LABEL_ARRAY, MULTIPLIER_ARRAY, PAGE_COUNT_IN_BOOK, PAGE_LABEL_ARRAY } from "./constants"
import type { TimeRecord } from "./types"

type CalcAverageTimeProps = {
    count: number
    timeRecordArray: TimeRecord[]
}
const calcAverageTime = ({ count, timeRecordArray }: CalcAverageTimeProps) => {
    const timeArray = timeRecordArray
        .filter((timeRecord) => timeRecord.count === count)
        .map((timeRecord) => timeRecord.time)
    const sum = timeArray.reduce((acc, cur) => acc + cur, 0)
    return sum / timeArray.length
}

type CalcProps = {
    byWhat: string
    timeRecordArray: TimeRecord[]
}
const calc = ({ byWhat, timeRecordArray }: CalcProps) => {
    const filtered = timeRecordArray.filter((timeRecord) => timeRecord.byWhat === byWhat)
    const countArray = MULTIPLIER_ARRAY.map((multiplier) => multiplier * PAGE_COUNT_IN_BOOK)
    const timePerCountArray = countArray.map((count) => calcAverageTime({ count, timeRecordArray: filtered }))
    return timePerCountArray
}

export const convertToChartData = (timeRecordArray: TimeRecord[]) => {
    const dataGrouped: Record<string, number[]> = BY_WHAT_ARRAY.reduce((acc, cur) => {
        return { ...acc, [cur]: calc({ byWhat: cur, timeRecordArray }) }
    }, {})

    const data = {
        labels: PAGE_LABEL_ARRAY,
        datasets: [
            {
                label: BY_WHAT_LABEL_ARRAY[0],
                data: dataGrouped[BY_WHAT_ARRAY[0]],
                backgroundColor: "oklch(0.7073 0.1273 19.58)",
            },
            {
                label: BY_WHAT_LABEL_ARRAY[1],
                data: dataGrouped[BY_WHAT_ARRAY[1]],
                backgroundColor: "#dabc7f",
            },
            {
                label: BY_WHAT_LABEL_ARRAY[2],
                data: dataGrouped[BY_WHAT_ARRAY[2]],
                backgroundColor: "oklch(0.7732 0.0906 125.78)",
            },
        ],
    }

    return data
}
