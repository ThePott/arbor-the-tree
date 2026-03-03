import useReviewCheckStore from "@/features/_sidebar._assigned._check.check/store"
import type { IndexInfo, QuestionWithAttemptInfo } from "@/features/_sidebar._assigned._check.check/types"
import Button from "@/packages/components/Button/Button"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import type { ReactNode } from "react"
import useCheckbox from "./hooks"

const checkboxVariants = cva("flex justify-center items-center", {
    variants: {
        isReviewed: { true: "size-8", false: "size-12" },
        status: { CORRECT: "", WRONG: "", null: "" },
        recency: { very: "", somewhat: "", no: "" },
    },
    compoundVariants: [
        { recency: "very", isReviewed: false, className: "outline-2 outline-border-vivid hover:outline-4" },
        { recency: "somewhat", isReviewed: false, className: "outline-2 outline-border-muted hover:outline-4" },
        {
            isReviewed: true,
            status: "CORRECT",
            className: "outline-2 outline-washed-green/30 -outline-offset-2 bg-bg-2",
        },
        {
            isReviewed: true,
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
    source: QuestionWithAttemptInfo
}

export type CheckboxProps = CheckboxCommonProps
const Checkbox = (props: CheckboxProps) => {
    const { children, indexInfo, source } = props
    const recentIndexInfoArray = useReviewCheckStore((state) => state.recentIndexInfoArray)

    const { handleClick } = useCheckbox(props)

    const recency = checkCheckboxRecency({
        checkboxIndexInfo: indexInfo,
        recentIndexInfoArray,
    })

    const { isReviewed, session_status, assignment_status, attempt_status_visual } = source
    const isEnabled = (session_status || assignment_status) && !isReviewed

    return (
        <Button
            color={!isReviewed ? statusToColor[attempt_status_visual ?? "null"] : "transparent"}
            status={isEnabled ? "enabled" : "disabled"}
            padding="none"
            border={isReviewed ? "none" : "always"}
            onClick={handleClick}
            className={clsx(
                checkboxVariants({ isReviewed, status: attempt_status_visual ?? "null", recency: recency })
            )}
        >
            {children}
        </Button>
    )
}

export default Checkbox
