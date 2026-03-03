import useReviewCheckStore from "@/features/_sidebar._assigned._check.check/store"
import { updateReviewCheckAssignmentQueryData } from "@/features/_sidebar._assigned._check.check/utils/optimistically-update-for-assignment"
import { updateReviewCheckQueryData } from "@/features/_sidebar._assigned._check.check/utils/optimistically-update-for-syllabus"
import { ClientError } from "@/shared/error/clientError"
import { getRouteApi } from "@tanstack/react-router"
import type { CheckboxProps } from ".."

const route = getRouteApi("/_sidebar")
const useCheckboxEventHandler = (props: CheckboxProps) => {
    const { forWhat, indexInfo, source } = props
    const status = useReviewCheckStore((state) => state.status)
    const isMultiSelecting = useReviewCheckStore((state) => state.isMultiSelecting)
    const insertRecentIndexInfo = useReviewCheckStore((state) => state.insertRecentIndexInfo)
    const idToChangedInfo = useReviewCheckStore((state) => state.idToChangedInfo)
    const setIdToChangedInfo = useReviewCheckStore((state) => state.setIdToChangedInfo)
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
        // NOTE: visual이 아니라 원래 상태와 비교
        if (source.attempt_status === status) {
            delete copiedIdToChangedInfo[source.id]
            updateReviewCheckQueryData({
                idToChangedInfo: copiedIdToChangedInfo,
                searchParams,
                storeCallback: () => setIdToChangedInfo(copiedIdToChangedInfo),
            })
            return
        }

        // NOTE: 원래 상태랑 다르면 추가 혹은 수정
        copiedIdToChangedInfo[source.id] =
            forWhat === "session"
                ? {
                      forWhat,
                      status,
                      indexInfo,
                      session_id: source.session_id, // NOTE: session_id는 joinedQuestion에 들어있는 채로 서버에게 받는다
                  }
                : {
                      forWhat,
                      status,
                      indexInfo,
                  }

        switch (forWhat) {
            case "session": {
                updateReviewCheckQueryData({
                    idToChangedInfo: copiedIdToChangedInfo,
                    searchParams,
                    storeCallback: () => setIdToChangedInfo(copiedIdToChangedInfo),
                })
                return
            }
            case "assignment": {
                updateReviewCheckAssignmentQueryData({
                    idToChangedInfo: copiedIdToChangedInfo,
                    searchParams,
                    storeCallback: () => setIdToChangedInfo(copiedIdToChangedInfo),
                })
                return
            }
            default:
                throw ClientError.Unexpected("오답 체크 도중 오류가 발생했어요")
        }
    }

    return { handleClick }
}
const useCheckbox = (props: CheckboxProps) => {
    const eventHanderReturns = useCheckboxEventHandler(props)
    return { ...eventHanderReturns }
}
export default useCheckbox
