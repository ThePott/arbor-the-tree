import useReviewCheckStore from "../store"
import type { IndexInfo } from "../types"

type checkIsBigger = {
    big: IndexInfo
    small: IndexInfo
}
const checkGEQ = ({ big, small }: checkIsBigger): boolean => {
    if (big.titleIndex > small.titleIndex) return true
    if (big.titleIndex < small.titleIndex) return false

    if (big.subtitleIndex > small.subtitleIndex) return true
    if (big.subtitleIndex < small.subtitleIndex) return false

    if (big.checkboxIndex >= small.checkboxIndex) return true
    return false
}
const checkLEQ = ({ big, small }: checkIsBigger): boolean => {
    if (big.titleIndex < small.titleIndex) return true
    if (big.titleIndex > small.titleIndex) return false

    if (big.subtitleIndex < small.subtitleIndex) return true
    if (big.subtitleIndex > small.subtitleIndex) return false

    if (big.checkboxIndex <= small.checkboxIndex) return true
    return false
}

export const checkIsMultiSelected = (indexInfo: IndexInfo): boolean => {
    const { titleIndex, subtitleIndex, checkboxIndex } = indexInfo
    const recentReviewCheckInfoArray = useReviewCheckStore.getState().recentIndexInfoArray
    const sortedRecentReviewCheckInfoArray = recentReviewCheckInfoArray.sort((a, b) => {
        if (a.titleIndex != b.titleIndex) return a.titleIndex - b.titleIndex
        if (a.subtitleIndex != b.subtitleIndex) return a.subtitleIndex - b.subtitleIndex
        return a.checkboxIndex - b.checkboxIndex
    })

    const length = recentReviewCheckInfoArray.length
    if (length === 0) return false
    if (length === 1) {
        // TODO: 선택된 게 나면 선택됐다.
        const reviewCheckInfo = recentReviewCheckInfoArray[0]
        if (
            reviewCheckInfo.titleIndex === titleIndex &&
            reviewCheckInfo.subtitleIndex === subtitleIndex &&
            reviewCheckInfo.checkboxIndex === checkboxIndex
        ) {
            return true
        }
        return false
    }

    const first = sortedRecentReviewCheckInfoArray[0]
    const second = sortedRecentReviewCheckInfoArray[1]
    const isGeqThanFirst = checkGEQ({ small: first, big: indexInfo })
    const isLeqThanSecond = checkGEQ({ small: indexInfo, big: second })

    return isGeqThanFirst && isLeqThanSecond
}
