import Button from "@/packages/components/Button/Button"
import { Hstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import useGlobalStore from "@/shared/store/globalStore"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useLayoutEffect } from "react"

const Sidebar = () => {
    const isSidebarOn = useGlobalStore((state) => state.isSidebarOn)
    const setIsSidebarOn = useGlobalStore((state) => state.setIsSidebarOn)
    const setIsBodyScrollable = useGlobalStore((state) => state.setIsBodyScrollable)

    useLayoutEffect(() => {
        setIsBodyScrollable(!isSidebarOn)
    }, [isSidebarOn])

    return (
        <AnimatePresence>
            {isSidebarOn && (
                <motion.div
                    initial={{ opacity: 0, backdropFilter: `blur(0px)` }}
                    animate={{ opacity: 1, backdropFilter: `blur(4px)` }}
                    exit={{ opacity: 0, backdropFilter: `blur(0px)` }}
                    className="bg-fg-vivid/5 top-0 left-0 h-screen w-screen z-1000 absolute"
                    onClick={() => setIsSidebarOn(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, transform: `translateX(-100px)` }}
                        animate={{ opacity: 1, transform: `translateX(0px)` }}
                        exit={{ opacity: 0, transform: `translateX(-100px)` }}
                        className="h-full"
                    >
                        <RoundBox
                            padding="md"
                            color="bg2"
                            className="absolute top-0 left-0 h-full rounded-l-none w-50"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <Hstack className="justify-end">
                                <Button color="bg2" isBorderedOnHover onClick={() => setIsSidebarOn(false)}>
                                    <X size={16} />
                                </Button>
                            </Hstack>
                            <p>this is sidebar</p>
                        </RoundBox>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Sidebar
