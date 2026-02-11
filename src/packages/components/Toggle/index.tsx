import { motionTransition } from "@/shared/utils/framerMotionAnimations"
import clsx from "clsx"
import { motion } from "motion/react"
import { useState, type ReactNode } from "react"
import { Hstack } from "../layouts"

type ToggleProps = {
    defaultIsOn?: boolean
    onChange: (isOn: boolean) => void
    children?: ReactNode
    isBordered?: boolean
}
const ToggleWrapper = ({ defaultIsOn, onChange, children, isBordered }: ToggleProps) => {
    const [isOn, setIsOn] = useState(defaultIsOn)

    const handleClick = () => {
        onChange(!isOn)
        setIsOn(!isOn)
    }

    return (
        <Hstack
            gap="md"
            className={clsx(
                "items-center rounded-full cursor-pointer select-none",
                isBordered && "px-4 py-2 border border-border-dim"
            )}
            onClick={handleClick}
        >
            {children}
            <div>
                <div className={clsx("rounded-full relative p-my-xs bg-fg-muted w-[34px] h-[14px]")}>
                    <motion.div
                        layoutId="toggle"
                        transition={motionTransition}
                        className={clsx(
                            "size-[20px] rounded-full absolute top-1/2 -translate-y-1/2",
                            isOn ? "right-[0px] bg-washed-green" : "left-[0px] bg-fg-vivid"
                        )}
                    />
                </div>
            </div>
        </Hstack>
    )
}

const Toggle = (props: ToggleProps) => {
    const { defaultIsOn } = props
    return <ToggleWrapper {...props} key={String(defaultIsOn)} />
}

export default Toggle
