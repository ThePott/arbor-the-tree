import useReviewCheckStore from "@/features/_sidebar._assigned._check.check/store"
import type { IndexInfo, JoinedQuestionWithIndexInfo } from "@/features/_sidebar._assigned._check.check/types"
import { updateReviewCheckQueryData } from "@/features/_sidebar._assigned._check.check/utils"
import { getRouteApi } from "@tanstack/react-router"
import Checkbox from "../../../flatItemComponents/Checkbox"

const route = getRouteApi("/_sidebar")

// NOTE: veryRecent, somewhatRecent인지 확인하는 용도. 같은지 다른지만 비교하면 됨
type CheckIsIndexInfoSame = {
    fromRecent?: IndexInfo // NOTE: recent array가 비어 있으면 [0], [1]이 undefined 로 나올 수 있다
    fromCheckbox: IndexInfo // NOTE: 여기엔 checkbox에서 사용하고 있는 question의 index info를 사용한다
}
const checkAreIndexesTheSame = ({ fromRecent, fromCheckbox }: CheckIsIndexInfoSame): boolean => {
    if (!fromRecent) return false
    return (
        fromRecent.titleIndex === fromCheckbox.titleIndex &&
        fromRecent.subtitleIndex === fromCheckbox.subtitleIndex &&
        fromRecent.checkboxIndex === fromCheckbox.checkboxIndex
    )
}

type ReviewCheckQuestionProps = {
    questionWithIndexInfo: JoinedQuestionWithIndexInfo
}
const ReviewCheckQuestion = ({ questionWithIndexInfo }: ReviewCheckQuestionProps) => {
    const { indexInfo, question } = questionWithIndexInfo

    const status = useReviewCheckStore((state) => state.status)
    const isMultiSelecting = useReviewCheckStore((state) => state.isMultiSelecting)
    const insertRecentIndexInfo = useReviewCheckStore((state) => state.insertRecentIndexInfo)
    const idToChangedInfo = useReviewCheckStore((state) => state.idToChangedInfo)
    const setIdToChangedInfo = useReviewCheckStore((state) => state.setIdToChangedInfo)
    const recentReviewCheckInfoArray = useReviewCheckStore((state) => state.recentIndexInfoArray)
    const searchParams = route.useSearch()

    // TODO: use event handler로 리팩터 한다
    const handleClick = () => {
        if (isMultiSelecting) {
            // NOTE: multi select일 때 구체적인 선택 로직은 page에서 이뤄진다
            // NOTE: 여기서는 recent에 추가하기만 한다
            insertRecentIndexInfo(indexInfo)
            return
        }

        const copiedIdToChangedInfo = { ...idToChangedInfo }
        // NOTE: 원래 상태랑 똑같으면 삭제
        if (question.review_check_status === status) {
            delete copiedIdToChangedInfo[question.id]
            updateReviewCheckQueryData({
                idToChangedInfo: copiedIdToChangedInfo,
                searchParams,
                storeCallback: () => setIdToChangedInfo(copiedIdToChangedInfo),
            })
            return
        }

        // NOTE: 원래 상태랑 다르면 추가 혹은 수정
        copiedIdToChangedInfo[question.id] = {
            forWhat: "syllabus",
            status,
            indexInfo,
            session_id: question.session_id,
        }

        updateReviewCheckQueryData({
            idToChangedInfo: copiedIdToChangedInfo,
            searchParams,
            storeCallback: () => setIdToChangedInfo(copiedIdToChangedInfo),
        })
    }

    const isVeryRecent = checkAreIndexesTheSame({
        fromRecent: recentReviewCheckInfoArray[recentReviewCheckInfoArray.length - 1],
        fromCheckbox: indexInfo,
    })
    const isSomewhatRecent = checkAreIndexesTheSame({
        fromRecent: recentReviewCheckInfoArray[recentReviewCheckInfoArray.length - 2],
        fromCheckbox: indexInfo,
    })

    return (
        <Checkbox
            review_check_status_visual={question.review_check_status_visual}
            session_status={question.session_status}
            onClick={handleClick}
            recent={isVeryRecent ? "very" : isSomewhatRecent ? "somewhat" : "no"}
        >
            {question.name}
        </Checkbox>
    )
}

export default ReviewCheckQuestion
