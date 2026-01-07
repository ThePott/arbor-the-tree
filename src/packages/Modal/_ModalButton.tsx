import Button from "../components/Button/Button"
import type { ButtonColor } from "../components/Button/buttonInterfaces"
import type { ReactNode } from "react"

type ModalButtonRole = "cancel" | "destruct" | "confirm"

type ModalButtonProps = {
    role: "cancel" | "destruct" | "confirm"
    onClick: () => void
    children: ReactNode
    isPending: boolean
}

type ModalButtonConfig = {
    color: ButtonColor
    isBorderedOnHover: boolean
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
                color: "black",
                isBorderedOnHover: true,
                status: isPending ? "disabled" : "enabled",
            }
        case "destruct":
            return {
                color: "red",
                isBorderedOnHover: false,
                status: isPending ? "pending" : "enabled",
            }
        case "confirm":
            return {
                color: "bg0",
                isBorderedOnHover: false,
                status: isPending ? "pending" : "enabled",
            }
    }
}

const ModalButton = ({ role, onClick, children, isPending }: ModalButtonProps) => {
    const config = makeConfig({ role, isPending })

    return (
        <Button {...config} status={isPending ? "pending" : "enabled"} onClick={onClick}>
            {children}
        </Button>
    )
}

export default ModalButton
