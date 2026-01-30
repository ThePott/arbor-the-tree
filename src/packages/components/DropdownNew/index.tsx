import type { ReactNode } from "react"
import DropdownContent from "./DropdownContent"
import { DropdownStoreProvider } from "./DropdownStoreProvider"
import DropdownTrigger from "./DropdownTrigger"

type DropdownProps = {
    children: ReactNode
}
const MinimalDropdown = ({ children }: DropdownProps) => {
    return (
        <DropdownStoreProvider>
            <div data-dropdown className="relative">
                {children}
            </div>
        </DropdownStoreProvider>
    )
}

MinimalDropdown.Trigger = DropdownTrigger
MinimalDropdown.Content = DropdownContent

export default MinimalDropdown
