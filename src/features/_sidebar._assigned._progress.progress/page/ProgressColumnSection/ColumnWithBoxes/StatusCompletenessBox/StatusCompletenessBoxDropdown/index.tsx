import Button from "@/packages/components/Button/Button"
import Dropdown from "@/packages/components/Dropdown"
import type { SessionStatus } from "@/shared/interfaces"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import { Ellipsis } from "lucide-react"
import type { ReactNode } from "react"

const dropdownTriggerVariants = cva("border border-transparent hover:border-fg-dim", {
    variants: {
        status: {
            HOMEWORK: "",
            TODAY: "",
            default: "",
        },
        isCompleted: {
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
            className: "hover:border-fg-inverted-dim",
        },
    ],
})
type ProgressSessionDropdownProps = {
    isCompleted: boolean
    status: SessionStatus | null
    children: ReactNode
}
const StatusCompletenessBoxDropdown = ({ isCompleted, status, children }: ProgressSessionDropdownProps) => {
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <Button
                    color="transparent"
                    padding="tight"
                    className={clsx(
                        dropdownTriggerVariants({
                            isCompleted,
                            status: status ?? "default",
                        })
                    )}
                >
                    <Ellipsis size={16} />
                </Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>{children}</Dropdown.Menu>
        </Dropdown>
    )
}

export default StatusCompletenessBoxDropdown
