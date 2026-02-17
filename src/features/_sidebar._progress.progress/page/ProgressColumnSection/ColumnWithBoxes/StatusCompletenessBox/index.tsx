import { Hstack, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import type { SessionStatus } from "@/shared/interfaces"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import type { ReactNode } from "react"

type StatusCompletenessBoxStyleProps = {
    isCompleted: boolean
    status: SessionStatus | "default"
    isOld: boolean
}

type StatusCompletenessBoxLabelProps = StatusCompletenessBoxStyleProps & {
    children: string
    role: "main" | "sub" | "conditional"
}
const roleVariants = cva("", {
    variants: {
        role: {
            main: "",
            sub: "text-my-xs",
            conditional: "text-my-md pl-3.5",
        },
    },
})
const StatusCompletenessBoxLabel = ({
    isCompleted,
    status,
    isOld,
    role,
    children,
}: StatusCompletenessBoxLabelProps) => {
    // NOTE: muted의 스타일만 지정하면 된다
    const isHomework = status === "HOMEWORK"
    const isNewToday = status === "TODAY" && !isOld

    const isBgBright = !isCompleted && (isHomework || isNewToday)
    const mutedClassName = clsx(isBgBright ? "text-fg-inverted-muted" : "text-fg-muted")
    return <p className={clsx(role !== "main" && mutedClassName, roleVariants({ role }))}>{children}</p>
}

type StatusCompletenessBoxLabelGroupProps = { children: ReactNode }
const StatusCompletenessBoxLabelGroup = ({ children }: StatusCompletenessBoxLabelGroupProps) => {
    return (
        <Vstack className="grop" gap="none">
            {children}
        </Vstack>
    )
}

type StatusCompletenessBoxProps = StatusCompletenessBoxStyleProps & {
    onClick: () => void
    children: ReactNode
}
const statusCompletenessBoxVariants = cva(
    "w-full outline -outline-offset-1 hover:outline-4 hover:-outline-offset-4 my-transition",
    {
        variants: {
            status: {
                HOMEWORK: "",
                TODAY: "",
                default: "outline-fg-dim",
            },
            isCompleted: {
                true: "",
                false: "",
            },
            // NOTE: assigned_at 추가한 다음 지난날은 연하게 표시하는 데에 사용
            // TODO: assigned_at 받고나면 갱신
            isOld: {
                true: "",
                false: "",
            },
        },
        // TODO: assigned_at 받고나면 갱신
        compoundVariants: [
            // NOTE: 상태 있을 때의 공통 속성: 글씨 관련
            {
                status: ["HOMEWORK", "TODAY"],
                isCompleted: false,
                className: "font-semibold text-fg-inverted-vivid",
            },
            {
                status: "TODAY",
                isCompleted: false,
                isOld: true,
                className: "font-semibold text-fg-vivid",
            },

            // NOTE: 부여만 되고 안 끝남, 새 것
            {
                status: "HOMEWORK",
                isCompleted: false,
                isOld: false,
                className: "bg-washed-yellow outline-washed-yellow hover:outline-fg-vivid",
            },
            {
                status: "TODAY",
                isCompleted: false,
                isOld: false,
                className: "bg-washed-blue outline-washed-blue hover:outline-fg-vivid",
            },

            // NOTE: 부여만 되고 안 끝남, 오래 됨
            {
                status: "HOMEWORK",
                isCompleted: false,
                isOld: true,
                className: "bg-washed-red hover:outline-fg-vivid outline-washed-red",
            },
            {
                status: "TODAY",
                isCompleted: false,
                isOld: true,
                className: "bg-dark-blue hover:outline-fg-vivid outline-dark-blue",
            },

            // NOTE: 부여되고 끝남, 새 것
            { status: "HOMEWORK", isCompleted: true, isOld: false, className: "outline-washed-yellow" },
            { status: "TODAY", isCompleted: true, isOld: false, className: "outline-washed-blue" },

            // NOTE: 부여되고 끝남, 오래된 것
            { status: "HOMEWORK", isCompleted: true, isOld: true, className: "outline-washed-red-neg-1" },
            { status: "TODAY", isCompleted: true, isOld: true, className: "outline-washed-blue-neg-1" },

            // NOTE: 부여 안 했는데 끝남
            // NOTE: 이게 보여서는 안 된다.
            {
                status: "default",
                isCompleted: true,
                className: "bg-red-400",
            },
        ],
    }
)
const StatusCompletenessBox = ({ isCompleted, status, isOld, onClick, children }: StatusCompletenessBoxProps) => {
    return (
        <RoundBox
            onClick={onClick}
            padding="md"
            className={clsx(statusCompletenessBoxVariants({ isCompleted, status: status, isOld }))}
        >
            <Hstack className="items-start" gap="none">
                {children}
            </Hstack>
        </RoundBox>
    )
}

StatusCompletenessBox.Label = StatusCompletenessBoxLabel
StatusCompletenessBox.LabelGroup = StatusCompletenessBoxLabelGroup

export default StatusCompletenessBox
