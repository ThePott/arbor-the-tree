import { FullScreen, FlexOneContainer } from "@/packages/components/layouts"
import useGlobalStore from "@/shared/store/globalStore"
import { Outlet } from "@tanstack/react-router"
import Header from "./Header"

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
