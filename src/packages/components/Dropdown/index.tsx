import type { ReactNode } from "react"
import DropdownContent from "./DropdownContent"
import DropdownMenu from "./DropdownMenu"
import DropdownMenuItem from "./DropdownMenuItem"
import { DropdownStoreProvider, type DropdownExternalValues } from "./DropdownStoreProvider"
import DropdownTrigger from "./DropdownTrigger"

type DropdownProps = DropdownExternalValues & {
    children: ReactNode
}
const Dropdown = ({ children, ...externalValues }: DropdownProps) => {
    return <DropdownStoreProvider {...externalValues}>{children}</DropdownStoreProvider>
}

Dropdown.Trigger = DropdownTrigger
Dropdown.Content = DropdownContent
Dropdown.Menu = DropdownMenu
Dropdown.MenuItem = DropdownMenuItem

export default Dropdown
