import Button from "../components/Button/Button"
import type { ButtonColor } from "../components/Button/buttonInterfaces"
import type { ReactNode } from "react"

type ModalButtonRole = "cancel" | "destruct" | "confirm"

type ModalButtonProps = {
    role: "cancel" | "destruct" | "confirm"
    onClick: () => void
    children: ReactNode
}

const ModalButton = ({ role, onClick, children }: ModalButtonProps) => {
    const roleToConfig: Record<ModalButtonRole, { color: ButtonColor; isBordered: boolean }> = {
        cancel: {
            color: "bg2",
            isBordered: true,
        },
        destruct: {
            color: "red",
            isBordered: false,
        },
        confirm: {
            color: "bg0",
            isBordered: false,
        },
    }

    const config = roleToConfig[role]

    return (
        <Button {...config} onClick={onClick}>
            {children}
        </Button>
    )
}

export default ModalButton
