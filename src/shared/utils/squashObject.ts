export const squashObject = <T extends string>(
    keyArray: readonly T[],
    obj1: Record<T, string>,
    obj2: Record<T, string>
) => {
    const squashedObject = keyArray.reduce(
        (acc, cur) => {
            const className = `${obj1[cur]} ${obj2[cur]}`
            acc[cur] = className
            return acc
        },
        {} as Record<T, string>
    )

    return squashedObject
}
