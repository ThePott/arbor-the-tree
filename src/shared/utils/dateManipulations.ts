import { formatDistanceToNowStrict } from "date-fns"
import { ko } from "date-fns/locale"

export const makeFromNow = (date: string | number | Date) =>
    formatDistanceToNowStrict(date, { addSuffix: true, locale: ko })

export const checkIsBeforeToday = (date: string | number | Date): boolean => {
    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)
    const comparingDate = new Date(date)

    return comparingDate < startOfToday
}

export const isSameDay = (firstDate: string | number | Date, secondDate: string | number | Date): boolean => {
    const first = new Date(firstDate)
    const second = new Date(secondDate)

    if (first.getFullYear() !== second.getFullYear()) return false
    if (first.getMonth() !== second.getMonth()) return false
    if (first.getDate() !== second.getDate()) return false

    return true
}
