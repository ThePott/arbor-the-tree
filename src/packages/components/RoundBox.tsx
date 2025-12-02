import type { Color, DivProps, SmToLg, XsToXl } from "@/shared/interfaces"
import { boxColorToCn, paddingToCn } from "@/shared/utils/styles"
import { cva } from "class-variance-authority"
import clsx from "clsx"

const roundBoxVariants = cva("", {
    variants: {
        padding: paddingToCn,
        color: boxColorToCn,
        isBordered: {
            true: "border border-border-dim",
            false: "",
        },
        radius: {
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

interface RoundBoxProps {
    radius?: SmToLg
    padding?: XsToXl
    color?: Color
    isBordered?: boolean
    isShadowed?: boolean
}

const RoundBox = ({ radius = "sm", padding, color, isBordered, isShadowed, ...props }: DivProps & RoundBoxProps) => {
    const { className, children } = props
    return (
        <div className={clsx(roundBoxVariants({ radius, padding, color, isBordered, isShadowed }), className)}>
            {children}
        </div>
    )
}

export default RoundBox
