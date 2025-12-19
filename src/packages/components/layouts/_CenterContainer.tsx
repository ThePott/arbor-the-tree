import type { DivProps } from "@/shared/interfaces"
import clsx from "clsx"

export const CenterContainer = (props: DivProps) => {
    const { children, className, ...rest } = props

    return (
        <div {...rest} className={clsx("flex h-full w-full flex-col items-center justify-center", className)}>
            {children}
        </div>
    )
}
