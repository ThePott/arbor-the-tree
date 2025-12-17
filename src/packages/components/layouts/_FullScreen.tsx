import type { DivProps } from "@/shared/interfaces"
import clsx from "clsx"

export const FullScreen = (props: DivProps) => {
    const { className, children, ...rest } = props
    return (
        <div {...rest} className={clsx("flex h-screen w-screen flex-col overflow-hidden", className)}>
            {children}
        </div>
    )
}
