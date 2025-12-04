import type { XsToXl } from "@/shared/interfaces"
import { cva } from "class-variance-authority"
import clsx from "clsx"

interface LoaderProps {
    size?: XsToXl
    isDark?: boolean
}

// NOTE: 나중에는 font size가 아니라 button size에 맞춰야 할지도 모르겠다
const loaderVariants = cva("", {
    variants: {
        size: {
            xs: "size-[12px]",
            sm: "size-[14px]",
            md: "size-[16px]",
            lg: "size-[18px]",
            xl: "size-[24px]",
        },
        isDark: {
            true: "bg-fg-vivid",
            false: "bg-washed-black",
        },
    },
})

const Loader = ({ size = "md", isDark }: LoaderProps) => {
    return <span className={clsx(loaderVariants({ size, isDark }))} />
}

export default Loader
