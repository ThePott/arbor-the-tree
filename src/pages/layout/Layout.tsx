import { FullScreen } from "@/packages/components/layouts"
import { Outlet } from "react-router"
import FlexOneContainer from "@/packages/components/layouts/_FlexOneContainer"
import { useState } from "react"
import Header from "./Header/Header"

const Layout = () => {
    // TODO: 라우트에 따라 헤더를 보이게 하거나 안 보이게 하거나 함
    const [isHeaderVisible, _setIsHeaderVisible] = useState(true)

    return (
        <FullScreen>
            {isHeaderVisible && <Header />}
            <FlexOneContainer>
                <Outlet />
            </FlexOneContainer>
        </FullScreen>
    )
}

export default Layout
