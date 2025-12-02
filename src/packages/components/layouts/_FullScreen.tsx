import type { DivProps } from "@/shared/interfaces"
import { cva } from "class-variance-authority"
import clsx from "clsx"

const fullScreenVariants = cva("flex h-screen w-screen flex-col overflow-hidden", {
    variants: {
        isCentered: {
            true: "justify-center items-center",
            false: "",
        },
    },
})

interface WithFullScreenProps {
    isCentered?: boolean
}

export const FullScreen = ({ isCentered, ...props }: DivProps & WithFullScreenProps) => {
    const { className, children, ...rest } = props
    return (
        <div {...rest} className={clsx(fullScreenVariants({ isCentered }), className)}>
            {children}
        </div>
    )
}
