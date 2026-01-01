export const separateNumberAtEnd = (text: string): [baseText: string, numberAtEnd: number] => {
    const regex = /(\d+)$/
    const match = text.match(regex)

    if (!match) return [text, NaN]

    const numberAtEnd = Number(match[0])
    const baseText = text.slice(0, match.index)
    return [baseText, numberAtEnd]
}
