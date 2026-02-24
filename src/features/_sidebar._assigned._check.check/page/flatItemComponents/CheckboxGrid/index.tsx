import type { ReactNode } from "react"

type CheckboxGridProps = {
    children: ReactNode
}
const CheckboxGrid = ({ children }: CheckboxGridProps) => {
    return <div className="grid grid-cols-[repeat(auto-fill,48px)] gap-my-xs grow">{children}</div>
}

export default CheckboxGrid
