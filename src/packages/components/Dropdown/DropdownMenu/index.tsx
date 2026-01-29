import { type ReactNode } from "react"
import { Vstack } from "../../layouts"
import RoundBox from "../../RoundBox"
import DropdownContent, { type DropdownDirection } from "../DropdownContent"

type DropdownMenuProps = {
    children: ReactNode
    direction?: DropdownDirection
}

const DropdownMenu = ({ children, direction = "bottomLeft" }: DropdownMenuProps) => {
    return (
        <DropdownContent direction={direction}>
            <RoundBox radius="md" color="bg3" padding="lg" isShadowed className="text-my-sm text-fg-vivid">
                <Vstack>{children}</Vstack>
            </RoundBox>
        </DropdownContent>
    )
}

export default DropdownMenu
