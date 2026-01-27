import type { ConciseSession } from "@/featuresPerRoute/progress/types"
import Button from "@/packages/components/Button/Button"
import Dropdown from "@/packages/components/Dropdown/Dropdown"
import { Hstack, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import { getRouteApi } from "@tanstack/react-router"
import clsx from "clsx"
import { Ellipsis } from "lucide-react"
import useProgressSession from "./hooks"

type ProgressSessionLabelProps = {
    conciseSession: ConciseSession
}
const ProgressSessionLabel = ({ conciseSession }: ProgressSessionLabelProps) => {
    return (
        <Vstack className="grow" gap="none">
            <p>{conciseSession.start.step}</p>
            {conciseSession.end.topic && (
                <p
                    className={clsx(
                        "text-my-sm pl-3.5",
                        conciseSession.status ? "text-fg-inverted-muted" : "text-fg-muted"
                    )}
                >
                    {conciseSession.end.topic}
                </p>
            )}
            {conciseSession.end.step && <p>~ {conciseSession.end.step}</p>}
            {conciseSession.completed_at && (
                <p className={clsx("text-my-xs", conciseSession.status ? "text-fg-inverted-muted" : "text-fg-muted")}>
                    {conciseSession.completed_at.slice(0, 10)}
                </p>
            )}
        </Vstack>
    )
}

const route = getRouteApi("/progress/")

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

export type ProgressSessionProps = {
    conciseSession: ConciseSession
    syllabus_id: string
    startingTopicTitle: string
}
const ProgressSession = (props: ProgressSessionProps) => {
    const { conciseSession } = props

    const { handleClickToComplete, handleDropdownMenuChange } = useProgressSession(props)

    return (
        <RoundBox
            onClick={handleClickToComplete}
            isBordered
            padding="md"
            color={
                conciseSession.status === "HOMEWORK" ? "red" : conciseSession.status === "TODAY" ? "blue" : undefined
            }
            className={clsx(
                "w-full",
                conciseSession.status && "text-fg-inverted-vivid",
                conciseSession.completed_at && "border-4 border-white"
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
