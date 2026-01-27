import type { ConciseSession } from "@/featuresPerRoute/progress/types"
import Button from "@/packages/components/Button/Button"
import Dropdown from "@/packages/components/Dropdown/Dropdown"
import { Hstack, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
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
    const isBgColored = conciseSession.status && !conciseSession.completed_at
    const mutedClassName = clsx(isBgColored ? "text-fg-inverted-muted" : "text-fg-muted")
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
                >{`${conciseSession.assigned_at.slice(0, 10)} 할당`}</p>
            )}
            {conciseSession.completed_at && (
                <p
                    className={clsx("text-my-xs", mutedClassName)}
                >{`${conciseSession.completed_at.slice(0, 10)} 완료`}</p>
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
            {
                status: ["HOMEWORK", "TODAY"],
                completed_at: false,
                className: "text-fg-inverted-vivid outline-transparent font-semibold",
            },
            {
                status: "HOMEWORK",
                completed_at: false,
                isOld: false,
                className: "bg-washed-red hover:outline-fg-vivid",
            },
            { status: "HOMEWORK", completed_at: true, isOld: false, className: "outline-washed-red" },
            {
                status: "TODAY",
                completed_at: false,
                isOld: false,
                className: "bg-washed-blue hover:outline-fg-vivid",
            },
            { status: "TODAY", completed_at: true, isOld: false, className: "outline-washed-blue" },
            {
                status: "default",
                completed_at: true,
                className: "outline-fg-vivid over:outline-fg-vivid",
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
    const { conciseSession } = props
    const { status, completed_at } = conciseSession

    const { handleClickToComplete, handleDropdownMenuChange } = useProgressSession(props)

    return (
        <RoundBox
            onClick={handleClickToComplete}
            padding="md"
            className={clsx(
                progressSessionVariants({
                    completed_at: Boolean(completed_at),
                    status: status ?? "default",
                    isOld: false,
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
