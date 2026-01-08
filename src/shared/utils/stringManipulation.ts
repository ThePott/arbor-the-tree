export const splitByLineBreakThenTrim = (text: string): string[] => {
    const result = text
        .split("\n")
        .filter((line) => line)
        .map((line) => line.trim())

    return result
}

export const separateStringNumber = (text: string): { baseText: string; startNumber: number; endNumber: number } => {
    const regex = /^(.*?)(\d+)~(\d+)$/
    const match = text.match(regex)

    if (!match) return { baseText: text, startNumber: NaN, endNumber: NaN }

    const baseText = match[1] ? match[1] : ""
    const startNumber = Number(match[2])
    const endNumber = Number(match[3])
    return { baseText, startNumber, endNumber }
}

export const makeUlLul = (hangulText: string): string => {
    const strGA = 44032 // NOTE: 가
    const strHI = 55203 // NOTE: 힣

    const lastStrCode = hangulText.charCodeAt(hangulText.length - 1)

    // NOTE: 한글이 아니면...
    if (lastStrCode < strGA || lastStrCode > strHI) {
        return ""
    }

    const hasJongsug = (lastStrCode - strGA) % 28 !== 0

    if (hasJongsug) {
        return "을"
    }

    return "를"
}
