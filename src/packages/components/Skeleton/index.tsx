import type { DivProps, None, SmToLg } from "@/shared/interfaces"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import styles from "./Skeleton.module.css"

const skeletonVariants = cva("", {
    variants: {
        radius: {
            none: "rounded-none",
            sm: "rounded-my-sm",
            md: "rounded-my-md",
            lg: "rounded-my-lg",
        },
        isShadowed: {
            true: "",
            false: "",
        },
    },
    compoundVariants: [
        {
            radius: "sm",
            isShadowed: true,
            className: "shadow-my-sm",
        },
        {
            radius: "md",
            isShadowed: true,
            className: "shadow-my-md",
        },
        {
            radius: "lg",
            isShadowed: true,
            className: "shadow-my-lg",
        },
    ],
})

interface WithSkeletonProps {
    heightInPixel?: number
    widthInPixel?: number
    radius?: SmToLg | None
    isShadowed?: boolean
}

const Skeleton = ({
    heightInPixel,
    widthInPixel,
    radius = "md",
    isShadowed,
    ...props
}: Omit<DivProps, "color"> & WithSkeletonProps) => {
    const { style, className, ...rest } = props
    const styleForVar: Record<string, string | undefined> = {}
    styleForVar["--width"] = widthInPixel ? `${widthInPixel}px` : undefined
    styleForVar["--height"] = heightInPixel ? `${heightInPixel}px` : undefined

    return (
        <div
            {...rest}
            style={{ ...styleForVar, ...style }}
            className={clsx(skeletonVariants({ radius, isShadowed }), styles.skeleton, className)}
        />
    )
}

export default Skeleton
