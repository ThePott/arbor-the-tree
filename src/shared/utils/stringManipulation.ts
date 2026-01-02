export const splitByLineBreakThenTrim = (text: string): string[] => {
    const result = text
        .split("\n")
        .filter((line) => line)
        .map((line) => line.trim())

    return result
}
