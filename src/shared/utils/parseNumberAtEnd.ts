export const separateNumberAtEnd = (text: string): { baseText: string; startNumber: number; endNumber: number } => {
    const regex = /(.+)?(\d+)~(\d+)$/
    const match = text.match(regex)

    if (!match) return { baseText: text, startNumber: NaN, endNumber: NaN }

    const baseText = match[1] ? match[1] : ""
    const startNumber = Number(match[2])
    const endNumber = Number(match[3])
    return { baseText, startNumber, endNumber }
}
