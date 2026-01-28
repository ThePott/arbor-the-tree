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
