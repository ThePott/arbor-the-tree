import useReviewCheckStore from "@/features/_sidebar._assigned._check.check/store"
import type {
    ExtendedReviewAssignmentQuestion,
    IndexInfo,
    JoinedQuestion,
} from "@/features/_sidebar._assigned._check.check/types"
import { updateReviewCheckQueryData } from "@/features/_sidebar._assigned._check.check/utils/optimistically-update-for-syllabus"
import Button from "@/packages/components/Button/Button"
import { getRouteApi } from "@tanstack/react-router"
import clsx from "clsx"
import type { ReactNode } from "react"

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

const statusToColor = {
    CORRECT: "green",
    WRONG: "red",
    null: "transparent",
} as const

const route = getRouteApi("/_sidebar")

type CheckboxCommonProps = {
    children: ReactNode
    indexInfo: IndexInfo
}
type CheckboxForSyllabusProps = {
    forWhat: "syllabus"
    source: JoinedQuestion
}
type CheckboxForAssignmentProps = {
    forWhat: "assignment"
    source: ExtendedReviewAssignmentQuestion
    assignment_id: string
}

type CheckboxProps = CheckboxCommonProps & (CheckboxForSyllabusProps | CheckboxForAssignmentProps)
const Checkbox = (props: CheckboxProps) => {
    const { forWhat, children, indexInfo, source } = props
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
        if (source.review_check_status === status) {
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
            forWhat === "syllabus"
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
                      assignment_id: props.assignment_id, // NOTE: assignment_id는 flatten 과정에서 주입된다
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
        <Button
            color={statusToColor[source.review_check_status_visual ?? "null"]}
            status={source.session_status ? "enabled" : "disabled"}
            padding="none"
            border="always"
            onClick={handleClick}
            className={clsx(
                "size-12 flex justify-center items-center",
                isVeryRecent && "outline-2 outline-border-vivid hover:outline-4",
                isSomewhatRecent && "outline-2 outline-border-muted hover:outline-4"
            )}
        >
            {children}
        </Button>
    )
}

export default Checkbox
