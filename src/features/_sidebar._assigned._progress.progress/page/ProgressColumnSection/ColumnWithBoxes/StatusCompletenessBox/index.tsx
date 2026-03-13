import makeComponentContext from "@/packages/components/ComponentContextProvider"
import { Hstack, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import type { DivProps, SessionStatus } from "@/shared/interfaces"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import { type ReactNode } from "react"

type StatusCompletenessBoxStyleProps = {
    disabled: boolean
    isCompleted: boolean
    status: SessionStatus | "default"
    isOld: boolean
}
type ContextProps = { isBgBright: boolean }
const { useComponentContext, ComponentContextProvider } = makeComponentContext<ContextProps>()

type StatusCompletenessBoxLabelProps = {
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
const StatusCompletenessBoxLabel = ({ role, children }: StatusCompletenessBoxLabelProps) => {
    const { isBgBright } = useComponentContext()
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

type StatusCompletenessBoxProps = StatusCompletenessBoxStyleProps & Pick<DivProps, "onClick" | "children">
const statusCompletenessBoxVariants = cva("w-full outline -outline-offset-1 my-transition", {
    variants: {
        disabled: {
            true: "",
            false: "hover:outline-4 hover:-outline-offset-4",
        },
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
            className: "bg-washed-green outline-washed-green hover:outline-fg-vivid",
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
            className: "bg-dark-green hover:outline-fg-vivid outline-dark-green",
        },

        // NOTE: 부여되고 끝남, 새 것
        { status: "HOMEWORK", isCompleted: true, isOld: false, className: "outline-washed-yellow" },
        { status: "TODAY", isCompleted: true, isOld: false, className: "outline-washed-green" },

        // NOTE: 부여되고 끝남, 오래된 것
        { status: "HOMEWORK", isCompleted: true, isOld: true, className: "outline-washed-red-neg-1" },
        { status: "TODAY", isCompleted: true, isOld: true, className: "outline-washed-green-neg-1" },

        // NOTE: 부여 안 했는데 끝남
        // NOTE: 이게 보여서는 안 된다.
        {
            status: "default",
            isCompleted: true,
            className: "bg-red-400",
        },
    ],
})
const StatusCompletenessBox = ({
    disabled,
    isCompleted,
    status,
    isOld,
    onClick,
    children,
}: StatusCompletenessBoxProps) => {
    // NOTE: muted의 스타일만 지정하면 된다
    const isHomework = status === "HOMEWORK"
    const isNewToday = status === "TODAY" && !isOld

    const isBgBright = !isCompleted && (isHomework || isNewToday)

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (disabled) return
        const target = event.target as HTMLElement
        if (target.closest("[data-dropdown]")) return
        onClick?.(event)
    }

    return (
        <ComponentContextProvider value={{ isBgBright }}>
            <RoundBox
                onClick={handleClick}
                padding="md"
                className={clsx(statusCompletenessBoxVariants({ disabled, isCompleted, status: status, isOld }))}
            >
                <Hstack
                    className={clsx("justify-between items-start", isBgBright && "text-fg-inverted-vivid")}
                    gap="none"
                >
                    {children}
                </Hstack>
            </RoundBox>
        </ComponentContextProvider>
    )
}

StatusCompletenessBox.Label = StatusCompletenessBoxLabel
StatusCompletenessBox.LabelGroup = StatusCompletenessBoxLabelGroup

export default StatusCompletenessBox
