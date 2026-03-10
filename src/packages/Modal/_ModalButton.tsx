import type { ReactNode } from "react"
import Button from "../components/Button/Button"
import type { ButtonBorder, ButtonColor } from "../components/Button/buttonInterfaces"

type ModalButtonRole = "cancel" | "destruct" | "confirm"

type ModalButtonConfig = {
    color: ButtonColor
    border: ButtonBorder
    status: "enabled" | "disabled" | "pending"
}

type MakeConfigProps = {
    role: ModalButtonRole
    isPending: boolean
}
const makeConfig = ({ role, isPending }: MakeConfigProps): ModalButtonConfig => {
    switch (role) {
        case "cancel":
            return {
                color: "transparent",
                border: "onHover",
                status: isPending ? "disabled" : "enabled",
            }
        case "destruct":
            return {
                color: "red",
                border: "none",
                status: isPending ? "pending" : "enabled",
            }
        case "confirm":
            return {
                color: "bg1",
                border: "none",
                status: isPending ? "pending" : "enabled",
            }
    }
}

type ModalButtonProps = {
    role: "cancel" | "destruct" | "confirm"
    onClick: () => void
    children: ReactNode
    isPending?: boolean
}
const ModalButton = ({ role, onClick, children, isPending = false }: ModalButtonProps) => {
    const config = makeConfig({ role, isPending })

    return (
        <Button {...config} status={isPending ? "pending" : "enabled"} onClick={onClick} isShadowed>
            {children}
        </Button>
    )
}

export default ModalButton
