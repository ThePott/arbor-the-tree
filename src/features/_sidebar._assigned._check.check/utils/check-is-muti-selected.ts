import useReviewCheckStore from "../store"
import type { IndexInfo } from "../types"

export const checkIsMultiSelected = ({
    titleIndex: titleOrder,
    subtitleIndex: subtitleOrder,
    checkboxIndex: checkboxOrder,
}: IndexInfo): boolean => {
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
            reviewCheckInfo.titleIndex === titleOrder &&
            reviewCheckInfo.subtitleIndex === subtitleOrder &&
            reviewCheckInfo.checkboxIndex === checkboxOrder
        ) {
            return true
        }
        return false
    }

    const first = sortedRecentReviewCheckInfoArray[0]
    const second = sortedRecentReviewCheckInfoArray[1]

    if (
        first.titleIndex <= titleOrder &&
        titleOrder <= second.titleIndex &&
        first.subtitleIndex <= subtitleOrder &&
        subtitleOrder <= second.subtitleIndex &&
        first.checkboxIndex <= checkboxOrder &&
        checkboxOrder <= second.checkboxIndex
    ) {
        return true
    }
    return false
}
