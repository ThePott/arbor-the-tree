import Button from "@/packages/components/Button/Button"
import type { ReviewCheckStatus, SessionStatus } from "@/shared/interfaces"
import clsx from "clsx"
import type { ReactNode } from "react"

const statusToColor = {
    CORRECT: "green",
    WRONG: "red",
    null: "transparent",
} as const

type CheckboxProps = {
    review_check_status_visual: ReviewCheckStatus | null
    session_status: SessionStatus | null
    onClick: React.MouseEventHandler<HTMLButtonElement>
    recent: "very" | "somewhat" | "no"
    children: ReactNode
}
const Checkbox = ({ review_check_status_visual, session_status, onClick, recent, children }: CheckboxProps) => {
    return (
        <Button
            color={statusToColor[review_check_status_visual ?? "null"]}
            status={session_status ? "enabled" : "disabled"}
            padding="none"
            border="always"
            onClick={onClick}
            className={clsx(
                "size-12 flex justify-center items-center",
                recent === "very" && "outline-2 outline-border-vivid hover:outline-4",
                recent === "somewhat" && "outline-2 outline-border-muted hover:outline-4"
            )}
        >
            {children}
        </Button>
    )
}

export default Checkbox
