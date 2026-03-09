import { FlexOneContainer, FullScreen, Vstack } from "@/packages/components/layouts"
import { Outlet } from "@tanstack/react-router"
import Header from "./Header"
import Sidebar from "./Sidebar"

const RootLayout = () => {
    return (
        <FullScreen className="relative">
            <Sidebar />
            <Vstack className="grow h-full" gap="none">
                <Header />
                <FlexOneContainer>
                    <Outlet />
                </FlexOneContainer>
            </Vstack>
        </FullScreen>
    )
}

export default RootLayout
