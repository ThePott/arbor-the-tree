import { FlexOneContainer, FullScreen, Vstack } from "@/packages/components/layouts"
import useGlobalStore from "@/shared/store/globalStore"
import { Outlet } from "@tanstack/react-router"
import Header from "./Header"
import Sidebar from "./Sidebar"

const RootLayout = () => {
    const isBodyScrollable = useGlobalStore((state) => state.isBodyScrollable)

    return (
        <FullScreen className="relative">
            <Sidebar />
            <Vstack className="grow h-full" gap="none">
                <Header />
                <FlexOneContainer isYScrollable={isBodyScrollable}>
                    <Outlet />
                </FlexOneContainer>
            </Vstack>
        </FullScreen>
    )
}

export default RootLayout
