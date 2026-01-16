import { BOOK_DETAIL_KEY_ARRAY, type BookWriteRow } from "../_bookWriteInterfaces"

const acceptOnlySlash = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (value === "/") return
    if (value.includes("/")) {
        event.target.value = "/"
        return
    }
    event.target.value = ""
}

const acceptOnlySlashOrNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    if (value === "/" || !Number.isNaN(Number(value))) return

    if (value.includes("/")) {
        event.target.value = "/"
        return
    }

    event.target.value = value.replace(/\D/g, "")
}

type ValidateChangeProps = {
    event: React.ChangeEvent<HTMLInputElement>
    columnKey: keyof BookWriteRow
}
export const validateChange = ({ event, columnKey }: ValidateChangeProps) => {
    switch (columnKey) {
        case "topic":
            acceptOnlySlash(event)
            return
        case "step":
            return
        case "question_page":
            acceptOnlySlashOrNumber(event)
            return
        case "question_name":
        case "solution_page":
            acceptOnlySlashOrNumber(event)
            return
        case "session":
            acceptOnlySlash(event)
            return
    }
}

const NAVIGATION_KEY_ARRAY = ["Enter", "ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"] as const
type NavigationKey = (typeof NAVIGATION_KEY_ARRAY)[number]
type MakeCoordinateProps = {
    columnKey: keyof BookWriteRow
    rowIndex: number
    key: NavigationKey
}
const makeCoordinate = ({ columnKey, rowIndex, key }: MakeCoordinateProps): string | null => {
    switch (key) {
        case "Enter":
        case "ArrowDown":
            return `${columnKey}-${rowIndex + 1}`
        case "ArrowUp":
            return `${columnKey}-${rowIndex - 1}`
        case "ArrowRight": {
            const columnIndex = BOOK_DETAIL_KEY_ARRAY.indexOf(columnKey)
            const nextColumnKey = BOOK_DETAIL_KEY_ARRAY[columnIndex + 1]
            if (!nextColumnKey) return null
            return `${nextColumnKey}-${rowIndex}`
        }
        case "ArrowLeft": {
            const columnIndex = BOOK_DETAIL_KEY_ARRAY.indexOf(columnKey)
            const previousColumnKey = BOOK_DETAIL_KEY_ARRAY[columnIndex - 1]
            if (!previousColumnKey) return null
            return `${previousColumnKey}-${rowIndex}`
        }
    }
}

const isNavigationKey = (key: string): key is NavigationKey => {
    return NAVIGATION_KEY_ARRAY.includes(key as NavigationKey)
}

type HandleKeyDownNavigation = {
    event: React.KeyboardEvent<HTMLInputElement>
    columnKey: keyof BookWriteRow
    rowIndex: number
}
export const handleKeyDownNavigation = ({ event, columnKey, rowIndex }: HandleKeyDownNavigation) => {
    const key = event.key
    if (!isNavigationKey(key)) return

    const coordinate = makeCoordinate({ columnKey, rowIndex, key })
    if (!coordinate) return

    const targetInput = document.querySelector(`[data-coordinate="${coordinate}"]`) as HTMLInputElement
    if (!targetInput) return
    targetInput.focus()
}
