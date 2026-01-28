import { motionTransition } from "@/shared/utils/framerMotionAnimations"
import clsx from "clsx"
import { motion } from "motion/react"
import { useState } from "react"

type ToggleProps = {
    defaultIsOn?: boolean
    onChange: (isOn: boolean) => void
}
const ToggleWrapper = ({ defaultIsOn, onChange }: ToggleProps) => {
    const [isOn, setIsOn] = useState(defaultIsOn)

    const handleClick = () => {
        onChange(!isOn)
        setIsOn(!isOn)
    }

    return (
        <div className="p-my-md" onClick={handleClick}>
            <div className={clsx("rounded-full relative p-my-xs bg-fg-muted w-[34px] h-[14px]")}>
                <motion.div
                    layout
                    transition={motionTransition}
                    className={clsx(
                        "size-[20px] rounded-full absolute top-1/2 -translate-y-1/2",
                        isOn ? "right-[0px] bg-washed-blue" : "left-[0px] bg-fg-vivid"
                    )}
                />
            </div>
        </div>
    )
}

const Toggle = (props: ToggleProps) => {
    const { defaultIsOn } = props
    return <ToggleWrapper {...props} key={String(defaultIsOn)} />
}

export default Toggle
