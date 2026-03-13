import Button from "@/packages/components/Button/Button"
import Labeled from "@/packages/components/Labeled/Labeled"
import { Hstack, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import useGlobalStore from "@/shared/store/globalStore"
import { checkIsAllowed } from "@/shared/utils/check-is-allowed"
import { useMatch, useNavigate } from "@tanstack/react-router"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useLayoutEffect, type ReactNode } from "react"

type SidebarButtonProps = {
    onClick: () => void
    children: ReactNode
}
const SidebarButton = ({ onClick, children }: SidebarButtonProps) => {
    const setIsSidebarOn = useGlobalStore((state) => state.setIsSidebarOn)
    return (
        <Button
            color="transparent"
            border="onHover"
            isOnLeft
            onClick={() => {
                setIsSidebarOn(false)
                onClick()
            }}
        >
            {children}
        </Button>
    )
}

const Sidebar = () => {
    const isSidebarOn = useGlobalStore((state) => state.isSidebarOn)
    const setIsSidebarOn = useGlobalStore((state) => state.setIsSidebarOn)
    const setIsBodyScrollable = useGlobalStore((state) => state.setIsBodyScrollable)

    const match = useMatch({ from: "/_sidebar", shouldThrow: false })
    const fullSearch = match?.search
    const studentSearch = { student_id: fullSearch?.student_id, classroom_id: fullSearch?.classroom_id }
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
                                    <Button color="bg2" border="onHover" onClick={() => setIsSidebarOn(false)}>
                                        <X size={16} />
                                    </Button>
                                </Hstack>

                                {checkIsAllowed("HELPER") && (
                                    <Labeled>
                                        <Labeled.Header>인원 관리</Labeled.Header>
                                        <RoundBox isBordered padding="md">
                                            <Vstack gap="xs">
                                                <SidebarButton onClick={() => navigate({ to: "/manage/resume" })}>
                                                    권한 요청 현황
                                                </SidebarButton>
                                                {checkIsAllowed("PRINCIPAL") && (
                                                    <SidebarButton onClick={() => navigate({ to: "/manage/delete" })}>
                                                        권한 삭제
                                                    </SidebarButton>
                                                )}
                                            </Vstack>
                                        </RoundBox>
                                    </Labeled>
                                )}

                                {checkIsAllowed("HELPER") && (
                                    <Labeled>
                                        <Labeled.Header>수업 관리</Labeled.Header>
                                        <RoundBox isBordered padding="md">
                                            <Vstack gap="xs">
                                                <SidebarButton onClick={() => navigate({ to: "/book" })}>
                                                    문제집 등록 / 삭제
                                                </SidebarButton>
                                                <SidebarButton onClick={() => navigate({ to: "/manage/student" })}>
                                                    반 / 학생 관리
                                                </SidebarButton>
                                            </Vstack>
                                        </RoundBox>
                                    </Labeled>
                                )}

                                <Labeled>
                                    <Labeled.Header>진도 / 오답 관리</Labeled.Header>
                                    <RoundBox isBordered padding="md">
                                        <Vstack gap="xs">
                                            <SidebarButton
                                                onClick={() => navigate({ to: "/progress", search: fullSearch })}
                                            >
                                                진도표
                                            </SidebarButton>
                                            <SidebarButton
                                                onClick={() => navigate({ to: "/check", search: fullSearch })}
                                            >
                                                오답 체크
                                            </SidebarButton>
                                            <SidebarButton
                                                onClick={() =>
                                                    navigate({ to: "/assignment/create", search: studentSearch })
                                                }
                                            >
                                                오답 과제 생성
                                            </SidebarButton>
                                            <SidebarButton
                                                onClick={() => navigate({ to: "/assignment", search: studentSearch })}
                                            >
                                                오답 과제 목록
                                            </SidebarButton>
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
