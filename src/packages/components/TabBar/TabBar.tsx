import { motion } from "motion/react"
import { useState } from "react"
import { Hstack } from "../layouts"
import { makeTransition } from "@/shared/utils/animation"

const TabBackgroundPill = () => {
    return (
        <motion.div
            layout
            layoutId="selected-pill"
            style={{ borderRadius: 9999 }}
            className="bg-bg-3 absolute inset-0"
            transition={makeTransition()}
        />
    )
}

const TabBackgroundUnderline = () => {
    return (
        <motion.div
            layout
            layoutId="tab-background"
            className="bg-fg-vivid absolute right-0 bottom-0 left-0 h-0.5"
            transition={makeTransition()}
        />
    )
}

type TabVariant = "underline" | "pill"

interface TabItemProps {
    variant: TabVariant
    tab: string
    isSelected: boolean
    onClick: () => void
}
const TabItem = ({ variant, tab, isSelected, onClick }: TabItemProps) => {
    return (
        <div className="relative cursor-pointer px-3 py-2" onClick={onClick}>
            {isSelected && (
                <>
                    {variant === "underline" && <TabBackgroundUnderline />}
                    {variant === "pill" && <TabBackgroundPill />}
                </>
            )}
            <p className="relative z-10">{tab}</p>
        </div>
    )
}

interface TabBar {
    variant: "underline" | "pill"
    tabArray: string[]
    onSelect: (tab: string) => void
}

const TabBar = ({ variant, tabArray, onSelect }: TabBar) => {
    const [selectedTab, setSelectedTab] = useState(tabArray[0])
    const handleTabClick = (tab: string) => {
        setSelectedTab(tab)
        onSelect(tab)
    }
    return (
        <Hstack>
            {tabArray.map((tab) => (
                <TabItem
                    variant={variant}
                    tab={tab}
                    isSelected={selectedTab === tab}
                    onClick={() => handleTabClick(tab)}
                />
            ))}
        </Hstack>
    )
}

export default TabBar
