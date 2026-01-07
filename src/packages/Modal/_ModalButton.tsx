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
    const roleToConfig: Record<ModalButtonRole, { color: ButtonColor; isBorderedOnHover: boolean }> = {
        cancel: {
            color: "black",
            isBorderedOnHover: true,
        },
        destruct: {
            color: "red",
            isBorderedOnHover: false,
        },
        confirm: {
            color: "bg0",
            isBorderedOnHover: false,
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
