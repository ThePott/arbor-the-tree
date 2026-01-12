import { FullScreen, FlexOneContainer } from "@/packages/components/layouts"
import Header from "@/pages/layout/Header/Header"
import useGlobalStore from "@/shared/store/globalStore"
import { Outlet } from "@tanstack/react-router"

const RootLayout = () => {
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
