import { type BookWriteRow, BOOK_DETAIL_KEY_ARRAY } from "../_bookWriteInterfaces"

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
const handleKeyDownNavigation = ({ event, columnKey, rowIndex }: HandleKeyDownNavigation) => {
    if (event.key === "Enter") {
        event.preventDefault()
    }

    const key = event.key
    if (!isNavigationKey(key)) return

    const coordinate = makeCoordinate({ columnKey, rowIndex, key })
    if (!coordinate) return

    const targetInput = document.querySelector(`[data-coordinate="${coordinate}"]`) as HTMLInputElement
    if (!targetInput) return
    targetInput.focus()
}

export default handleKeyDownNavigation
