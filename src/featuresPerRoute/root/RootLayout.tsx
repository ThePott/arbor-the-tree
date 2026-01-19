import { FlexOneContainer, FullScreen } from "@/packages/components/layouts"
import { debugRender } from "@/shared/config/debug/debug"
import useGlobalStore from "@/shared/store/globalStore"
import { Outlet } from "@tanstack/react-router"
import Header from "./Header"

const RootLayout = () => {
    debugRender("RootLayout")
    const isBodyScrollable = useGlobalStore((state) => state.isBodyScrollable)

    return (
        <FullScreen>
            <Header />
            <FlexOneContainer isYScrollable={isBodyScrollable} className="[scrollbar-gutter:stable]">
                <Outlet />
            </FlexOneContainer>
        </FullScreen>
    )
}

export default RootLayout
