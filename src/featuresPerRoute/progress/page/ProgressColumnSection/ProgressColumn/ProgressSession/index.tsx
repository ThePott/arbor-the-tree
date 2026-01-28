import type { ConciseSession } from "@/featuresPerRoute/progress/types"
import Button from "@/packages/components/Button/Button"
import Dropdown from "@/packages/components/Dropdown/Dropdown"
import { Hstack, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import { debugRender } from "@/shared/config/debug/"
import { checkIsBeforeToday, makeFromNow } from "@/shared/utils/dateManipulations"
import { getRouteApi } from "@tanstack/react-router"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import { Ellipsis } from "lucide-react"
import useProgressSession from "./hooks"

const route = getRouteApi("/progress/")

type ProgressSessionLabelProps = {
    conciseSession: ConciseSession
}
const ProgressSessionLabel = ({ conciseSession }: ProgressSessionLabelProps) => {
    // NOTE: muted의 스타일만 지정하면 된다
    const isBgBright =
        conciseSession.status &&
        !conciseSession.completed_at &&
        !(
            conciseSession.status === "TODAY" &&
            conciseSession.assigned_at &&
            checkIsBeforeToday(conciseSession.assigned_at)
        )
    const mutedClassName = clsx(isBgBright ? "text-fg-inverted-muted" : "text-fg-muted")
    return (
        <Vstack className="grow" gap="none">
            <p>{conciseSession.start.step}</p>
            {conciseSession.end.topic && (
                <p className={clsx("text-my-sm pl-3.5", mutedClassName)}>{conciseSession.end.topic}</p>
            )}
            {conciseSession.end.step && <p>~ {conciseSession.end.step}</p>}
            {conciseSession.assigned_at && (
                <p
                    className={clsx("text-my-xs", mutedClassName)}
                >{`${makeFromNow(conciseSession.assigned_at)} 할당`}</p>
            )}
            {conciseSession.completed_at && (
                <p
                    className={clsx("text-my-xs", mutedClassName)}
                >{`${makeFromNow(conciseSession.completed_at)} 완료`}</p>
            )}
        </Vstack>
    )
}

type ProgressSessionDropdownProps = {
    handleDropdownMenuChange: (value: string) => void
}
const ProgressSessionDropdown = ({ handleDropdownMenuChange }: ProgressSessionDropdownProps) => {
    const searchParams = route.useSearch()
    const { classroom_id, student_id } = searchParams
    const isInteractable = Boolean(classroom_id) !== Boolean(student_id)
    if (!isInteractable) return null

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <Button color="black" isBorderedOnHover>
                    <Ellipsis size={16} />
                </Button>
            </Dropdown.Trigger>
            <Dropdown.Menu onChange={handleDropdownMenuChange}>
                <Dropdown.MenuItem value="homework">숙제</Dropdown.MenuItem>
                <Dropdown.MenuItem value="today">오늘</Dropdown.MenuItem>
                <Dropdown.MenuItem value="dismiss">해제</Dropdown.MenuItem>
            </Dropdown.Menu>
        </Dropdown>
    )
}

const progressSessionVariants = cva(
    "w-full outline -outline-offset-1 hover:outline-4 hover:-outline-offset-4 my-transition",
    {
        variants: {
            status: {
                HOMEWORK: "",
                TODAY: "",
                default: "outline-fg-dim",
            },
            completed_at: {
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
                completed_at: false,
                className: "font-semibold text-fg-inverted-vivid",
            },
            {
                status: "TODAY",
                completed_at: false,
                isOld: true,
                className: "font-semibold text-fg-vivid",
            },

            // NOTE: 부여만 되고 안 끝남, 새 것
            {
                status: "HOMEWORK",
                completed_at: false,
                isOld: false,
                className: "bg-washed-yellow outline-washed-yellow hover:outline-fg-vivid",
            },
            {
                status: "TODAY",
                completed_at: false,
                isOld: false,
                className: "bg-washed-blue outline-washed-blue hover:outline-fg-vivid",
            },

            // NOTE: 부여만 되고 안 끝남, 오래 됨
            {
                status: "HOMEWORK",
                completed_at: false,
                isOld: true,
                className: "bg-washed-red hover:outline-fg-vivid outline-washed-red",
            },
            {
                status: "TODAY",
                completed_at: false,
                isOld: true,
                className: "bg-dark-blue hover:outline-fg-vivid outline-dark-blue",
            },

            // NOTE: 부여되고 끝남, 새 것
            { status: "HOMEWORK", completed_at: true, isOld: false, className: "outline-washed-yellow" },
            { status: "TODAY", completed_at: true, isOld: false, className: "outline-washed-blue" },

            // NOTE: 부여되고 끝남, 오래된 것
            { status: "HOMEWORK", completed_at: true, isOld: true, className: "outline-washed-red-neg-1" },
            { status: "TODAY", completed_at: true, isOld: true, className: "outline-washed-blue-neg-1" },

            // NOTE: 부여 안 했는데 끝남
            // NOTE: 이게 보여서는 안 된다.
            {
                status: "default",
                completed_at: true,
                className: "bg-red-400",
            },
        ],
    }
)

export type ProgressSessionProps = {
    conciseSession: ConciseSession
    syllabus_id: string
    startingTopicTitle: string
}
const ProgressSession = (props: ProgressSessionProps) => {
    debugRender(
        "ProgressSession %s status=%s completed_at=%s",
        props.conciseSession.id,
        props.conciseSession.status,
        props.conciseSession.completed_at
    )
    const { conciseSession } = props
    const { status, completed_at, assigned_at } = conciseSession

    const { handleClickToComplete, handleDropdownMenuChange } = useProgressSession(props)

    return (
        <RoundBox
            onClick={handleClickToComplete}
            padding="md"
            className={clsx(
                progressSessionVariants({
                    completed_at: Boolean(completed_at),
                    status: status ?? "default",
                    isOld: assigned_at ? checkIsBeforeToday(assigned_at) : false,
                })
            )}
        >
            <Hstack className="items-start" gap="none">
                <ProgressSessionLabel conciseSession={conciseSession} />
                <ProgressSessionDropdown handleDropdownMenuChange={handleDropdownMenuChange} />
            </Hstack>
        </RoundBox>
    )
}

export default ProgressSession
