import Button from "@/packages/components/Button/Button"
import Labeled from "@/packages/components/Labeled/Labeled"
import { Hstack, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import useGlobalStore from "@/shared/store/globalStore"
import { useNavigate } from "@tanstack/react-router"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useLayoutEffect } from "react"

const Sidebar = () => {
    const isSidebarOn = useGlobalStore((state) => state.isSidebarOn)
    const setIsSidebarOn = useGlobalStore((state) => state.setIsSidebarOn)
    const setIsBodyScrollable = useGlobalStore((state) => state.setIsBodyScrollable)

    const navigate = useNavigate()

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
                            padding="lg"
                            color="bg2"
                            className="absolute top-0 left-0 h-full rounded-l-none w-[300px]"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <Vstack gap="md">
                                <Hstack className="justify-end">
                                    <Button color="bg2" isBorderedOnHover onClick={() => setIsSidebarOn(false)}>
                                        <X size={16} />
                                    </Button>
                                </Hstack>

                                <Labeled>
                                    <Labeled.Header>진도표</Labeled.Header>
                                    <RoundBox isBordered padding="md">
                                        <Vstack gap="xs">
                                            <Button
                                                color="bg2"
                                                isBorderedOnHover
                                                isOnLeft
                                                onClick={() => {
                                                    setIsSidebarOn(false)
                                                    navigate({ to: "/progress" })
                                                }}
                                            >
                                                전체
                                            </Button>
                                            <Button
                                                color="bg2"
                                                isBorderedOnHover
                                                isOnLeft
                                                onClick={() => {
                                                    setIsSidebarOn(false)
                                                    navigate({ to: "/progress/summarized" })
                                                }}
                                            >
                                                요약
                                            </Button>
                                        </Vstack>
                                    </RoundBox>
                                </Labeled>

                                <Labeled>
                                    <Labeled.Header>오답 과제</Labeled.Header>
                                    <RoundBox isBordered padding="md">
                                        <Vstack gap="xs">
                                            <Button
                                                color="bg2"
                                                isBorderedOnHover
                                                isOnLeft
                                                onClick={() => {
                                                    setIsSidebarOn(false)
                                                    navigate({ to: "/review-check" })
                                                }}
                                            >
                                                오답 과제 목록
                                            </Button>
                                            <Button
                                                color="bg2"
                                                isBorderedOnHover
                                                isOnLeft
                                                onClick={() => {
                                                    setIsSidebarOn(false)
                                                    navigate({ to: "/review-check/book" })
                                                }}
                                            >
                                                오답 체크
                                            </Button>
                                        </Vstack>
                                    </RoundBox>
                                </Labeled>
                            </Vstack>
                        </RoundBox>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Sidebar
