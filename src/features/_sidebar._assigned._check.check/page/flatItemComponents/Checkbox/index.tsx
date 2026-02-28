import useReviewCheckStore from "@/features/_sidebar._assigned._check.check/store"
import type {
    ExtendedReviewAssignmentQuestion,
    IndexInfo,
    JoinedQuestion,
} from "@/features/_sidebar._assigned._check.check/types"
import Button from "@/packages/components/Button/Button"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import type { ReactNode } from "react"
import useCheckbox from "./hooks"

const checkboxVariants = cva("flex justify-center items-center", {
    variants: {
        isCompleted: { true: "size-8", false: "size-12" },
        status: { CORRECT: "", WRONG: "", null: "" },
        recency: { very: "", somewhat: "", no: "" },
    },
    compoundVariants: [
        { recency: "very", isCompleted: false, className: "outline-2 outline-border-vivid hover:outline-4" },
        { recency: "somewhat", isCompleted: false, className: "outline-2 outline-border-muted hover:outline-4" },
        {
            isCompleted: true,
            status: "CORRECT",
            className: "outline-2 outline-washed-green/30 -outline-offset-2 bg-bg-2",
        },
        {
            isCompleted: true,
            status: "WRONG",
            className: "outline-2 outline-washed-red/30 -outline-offset-2 bg-bg-2",
        },
    ],
})

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
type CheckCheckboxRecencyProps = {
    checkboxIndexInfo: IndexInfo
    recentIndexInfoArray: IndexInfo[]
}
type CheckboxRecency = "very" | "somewhat" | "no"
const checkCheckboxRecency = ({
    checkboxIndexInfo,
    recentIndexInfoArray,
}: CheckCheckboxRecencyProps): CheckboxRecency => {
    const isVeryRecent = checkAreIndexesTheSame({
        fromRecent: recentIndexInfoArray[recentIndexInfoArray.length - 1],
        fromCheckbox: checkboxIndexInfo,
    })
    if (isVeryRecent) return "very"

    const isSomewhatRecent = checkAreIndexesTheSame({
        fromRecent: recentIndexInfoArray[recentIndexInfoArray.length - 2],
        fromCheckbox: checkboxIndexInfo,
    })
    if (isSomewhatRecent) return "somewhat"

    return "no"
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
    const recentIndexInfoArray = useReviewCheckStore((state) => state.recentIndexInfoArray)

    const { handleClick } = useCheckbox(props)

    const recency = checkCheckboxRecency({
        checkboxIndexInfo: indexInfo,
        recentIndexInfoArray,
    })

    const isCompleted = Boolean(source.review_assignment_created_at)

    return (
        <Button
            color={!isCompleted ? statusToColor[source.review_check_status_visual ?? "null"] : "transparent"}
            status={source.session_status && !isCompleted ? "enabled" : "disabled"}
            padding="none"
            border={isCompleted ? "none" : "always"}
            onClick={handleClick}
            className={clsx(
                checkboxVariants({ isCompleted, status: source.review_check_status_visual ?? "null", recency: recency })
            )}
        >
            {children}
        </Button>
    )
}

export default Checkbox
