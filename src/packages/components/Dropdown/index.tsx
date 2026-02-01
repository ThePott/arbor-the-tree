import clsx from "clsx"
import type { ReactNode } from "react"
import DropdownContent from "./DropdownContent"
import DropdownMenu from "./DropdownMenu"
import DropdownMenuItem from "./DropdownMenuItem"
import { DropdownStoreProvider, type DropdownExternalValues } from "./DropdownStoreProvider"
import DropdownTrigger from "./DropdownTrigger"

type DropdownProps = DropdownExternalValues & {
    children: ReactNode
}
const Dropdown = ({ children, width = "xs", direction = "right", ...rest }: DropdownProps) => {
    const { className } = rest
    return (
        <DropdownStoreProvider {...{ width, direction, ...rest }}>
            <div data-dropdown className={clsx("relative", className)}>
                {children}
            </div>
        </DropdownStoreProvider>
    )
}

Dropdown.Trigger = DropdownTrigger
Dropdown.Content = DropdownContent
Dropdown.Menu = DropdownMenu
Dropdown.MenuItem = DropdownMenuItem

export default Dropdown
