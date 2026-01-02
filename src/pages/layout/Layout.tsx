import { FlexOneContainer, FullScreen } from "@/packages/components/layouts"
import { Outlet } from "react-router"
import { useState } from "react"
import Header from "./Header/Header"
import useOAuth from "./_useOAuth"
import useGlobalStore from "@/shared/store/globalStore"

const Layout = () => {
    // TODO: 라우트에 따라 헤더를 보이게 하거나 안 보이게 하거나 함
    const [isHeaderVisible, _setIsHeaderVisible] = useState(true)
    const isBodyScrollable = useGlobalStore((state) => state.isBodyScrollable)

    useOAuth()

    return (
        <FullScreen>
            {isHeaderVisible && <Header />}
            <FlexOneContainer isYScrollable={isBodyScrollable} className="[scrollbar-gutter:stable]">
                <Outlet />
            </FlexOneContainer>
        </FullScreen>
    )
}

export default Layout
