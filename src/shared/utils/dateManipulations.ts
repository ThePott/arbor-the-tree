import { formatDistanceToNowStrict } from "date-fns"
import { ko } from "date-fns/locale"

export const makeFromNow = (date: string | number | Date) =>
    formatDistanceToNowStrict(date, { addSuffix: true, locale: ko })
