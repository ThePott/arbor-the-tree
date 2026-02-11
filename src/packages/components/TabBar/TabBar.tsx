import { makeTransition } from "@/shared/utils/animation"
import clsx from "clsx"
import { motion } from "motion/react"
import { useState } from "react"
import { Hstack } from "../layouts"

type BackgroundProps = {
    additionalClassName?: string
}
const TabBackgroundPill = ({ additionalClassName }: BackgroundProps) => {
    return (
        <motion.div
            layout
            layoutId="selected-pill"
            style={{ borderRadius: 9999 }}
            className={clsx("bg-bg-3 absolute inset-0", additionalClassName)}
            transition={makeTransition()}
        />
    )
}
const TabBackgroundUnderline = ({ additionalClassName }: BackgroundProps) => {
    return (
        <motion.div
            layout
            layoutId="tab-background"
            className={clsx("bg-fg-vivid absolute right-0 bottom-0 left-0 h-0.5", additionalClassName)}
            transition={makeTransition()}
        />
    )
}

type TabVariant = "underline" | "pill"
export type Tab<T extends string> = {
    label: string
    value: T
}
type TabItemProps<T extends string> = {
    variant: TabVariant
    tab: Tab<T>
    isSelected: boolean
    onClick: () => void
    backgroundProps?: BackgroundProps
}
const TabItem = <T extends string>({ variant, tab, isSelected, onClick, backgroundProps }: TabItemProps<T>) => {
    return (
        <div className="relative cursor-pointer px-3 py-2" onClick={onClick}>
            {isSelected && (
                <>
                    {variant === "underline" && <TabBackgroundUnderline {...backgroundProps} />}
                    {variant === "pill" && <TabBackgroundPill {...backgroundProps} />}
                </>
            )}
            <p className="relative z-10">{tab.label}</p>
        </div>
    )
}

type TabBar<T extends string> = {
    variant: TabVariant
    tabArray: Tab<T>[]
    onSelect: (tab: Tab<T>) => void
    backgroundProps?: BackgroundProps
}
const TabBar = <T extends string>({ variant, tabArray, onSelect, backgroundProps }: TabBar<T>) => {
    const [selectedTabValue, setSelectedTabValue] = useState(tabArray[0].value)
    const handleTabClick = (tab: Tab<T>) => {
        setSelectedTabValue(tab.value)
        onSelect(tab)
    }
    return (
        <Hstack>
            {tabArray.map((tab) => (
                <TabItem
                    backgroundProps={backgroundProps}
                    key={tab.value}
                    variant={variant}
                    tab={tab}
                    isSelected={selectedTabValue === tab.value}
                    onClick={() => handleTabClick(tab)}
                />
            ))}
        </Hstack>
    )
}

export default TabBar
