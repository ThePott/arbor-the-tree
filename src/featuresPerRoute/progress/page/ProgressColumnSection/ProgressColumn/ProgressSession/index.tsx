import type { ConciseSession } from "@/featuresPerRoute/progress/types"
import { instance } from "@/packages/api/axiosInstances"
import Button from "@/packages/components/Button/Button"
import Dropdown from "@/packages/components/Dropdown/Dropdown"
import { Hstack, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import { getRouteApi } from "@tanstack/react-router"
import clsx from "clsx"
import { Ellipsis } from "lucide-react"

type ProgressSessionLabelProps = {
    conciseSession: ConciseSession
}
const ProgressSessionLabel = ({ conciseSession }: ProgressSessionLabelProps) => {
    return (
        <Vstack className="grow">
            <p>{conciseSession.start.step}</p>
            {conciseSession.end.topic && (
                <p className="text-fg-muted text-my-sm pl-[14px]">{conciseSession.end.topic}</p>
            )}
            {conciseSession.end.step && <p>~ {conciseSession.end.step}</p>}
        </Vstack>
    )
}

const route = getRouteApi("/progress/")
type ProgressSessionProps = {
    conciseSession: ConciseSession
}
const ProgressSession = ({ conciseSession }: ProgressSessionProps) => {
    const { classroom_id, student_id } = route.useSearch()
    const isInteractable = Boolean(classroom_id) !== Boolean(student_id)
    return (
        <RoundBox
            isBordered
            padding="md"
            color={
                conciseSession.status === "HOMEWORK" ? "red" : conciseSession.status === "TODAY" ? "blue" : undefined
            }
            className={clsx("w-full", conciseSession.status && "text-fg-inverted-vivid")}
        >
            <Hstack className="items-start">
                <ProgressSessionLabel conciseSession={conciseSession} />
                {isInteractable && (
                    <Dropdown>
                        <Dropdown.Trigger>
                            <Button color="black" isBorderedOnHover>
                                <Ellipsis size={16} />
                            </Button>
                        </Dropdown.Trigger>
                        <Dropdown.Menu
                            onChange={async (value) => {
                                const baseBody = {
                                    session_id: conciseSession.id,
                                    classroom_id,
                                    student_id,
                                }
                                switch (value) {
                                    case "homework": {
                                        const response = await instance.post("/progress/session", {
                                            ...baseBody,
                                            session_status: "HOMEWORK",
                                        })
                                        break
                                    }
                                    case "today": {
                                        const response = await instance.post("/progress/session", {
                                            ...baseBody,
                                            session_status: "TODAY",
                                        })
                                        break
                                    }
                                    case "dismiss":
                                        break
                                }
                            }}
                        >
                            <Dropdown.MenuItem value="homework">숙제</Dropdown.MenuItem>
                            <Dropdown.MenuItem value="today">오늘</Dropdown.MenuItem>
                            <Dropdown.MenuItem value="dismiss">해제</Dropdown.MenuItem>
                        </Dropdown.Menu>
                    </Dropdown>
                )}
            </Hstack>
        </RoundBox>
    )
}

export default ProgressSession
