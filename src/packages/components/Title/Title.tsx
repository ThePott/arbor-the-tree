import type { HeadingProps, SmToLg } from "@/shared/interfaces"
import { cva } from "class-variance-authority"
import clsx from "clsx"

const titleVariants = cva("font-semibold", {
    variants: {
        size: {
            sm: "",
            md: "text-my-lg",
            lg: "text-my-xl",
        },
        isMuted: {
            false: "",
            true: "text-fg-muted",
        },
    },
})

interface WithTitleProps {
    as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    size?: SmToLg
    isMuted?: boolean
}

const Title = ({ as: Component = "h2", size = "md", isMuted, ...props }: HeadingProps & WithTitleProps) => {
    const { className, children, ...rest } = props

    return (
        <Component {...rest} className={clsx(titleVariants({ size, isMuted }), className)}>
            {children}
        </Component>
    )
}

export default Title
