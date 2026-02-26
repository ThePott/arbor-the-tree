import useReviewCheckStore from "@/features/_sidebar._assigned._check.check/store"
import type {
    ExtendedReviewAssignmentQuestion,
    IndexInfo,
    JoinedQuestion,
} from "@/features/_sidebar._assigned._check.check/types"
import Button from "@/packages/components/Button/Button"
import clsx from "clsx"
import type { ReactNode } from "react"
import useCheckbox from "./hooks"

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

export type CheckboxProps = CheckboxCommonProps & (CheckboxForSyllabusProps | CheckboxForAssignmentProps) // NOTE: hooks에서 그대로 받아 사용함
const Checkbox = (props: CheckboxProps) => {
    const { children, indexInfo, source } = props
    const recentReviewCheckInfoArray = useReviewCheckStore((state) => state.recentIndexInfoArray)

    const { handleClick } = useCheckbox(props)

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
