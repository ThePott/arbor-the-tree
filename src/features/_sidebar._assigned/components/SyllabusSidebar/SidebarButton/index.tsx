import Button from "@/packages/components/Button/Button"
import { Hstack, Vstack } from "@/packages/components/layouts"
import type { ButtonProps, DivProps } from "@/shared/interfaces"
import { X } from "lucide-react"
import type { ReactNode } from "react"

type SidebarButtonXButton = Pick<ButtonProps, "onClick">
const SidebarButtonXButton = ({ onClick }: SidebarButtonXButton) => {
    return (
        <Button padding="tight" border="onHover" color="transparent" onClick={onClick}>
            <X size={16} />
        </Button>
    )
}

type SidebarButtonTextSectionProps = {
    children: ReactNode
}
const SidebarButtonTextSection = ({ children }: SidebarButtonTextSectionProps) => {
    return (
        <Vstack gap="none" className="grow">
            {children}
        </Vstack>
    )
}

type SidebarButtonProps = Pick<DivProps, "onClick"> & {
    isSelected: boolean
    children: ReactNode
}
const SidebarButton = ({ onClick, isSelected, children }: SidebarButtonProps) => {
    return (
        <Button
            as="div"
            border="onHover"
            color={isSelected ? "bg2" : "transparent"}
            isOnLeft
            onClick={onClick}
            className="grow"
        >
            <Hstack className="w-full items-center">{children}</Hstack>
        </Button>
    )
}

SidebarButton.TextSection = SidebarButtonTextSection
SidebarButton.XButton = SidebarButtonXButton

export default SidebarButton
