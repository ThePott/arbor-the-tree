import Button from "@/packages/components/Button/Button"
import { Hstack } from "@/packages/components/layouts"
import { debugRender } from "@/shared/config/debug/"
import useGlobalStore from "@/shared/store/globalStore"
import { PanelLeft } from "lucide-react"
import KakaoLoginButton from "./_KakaoLoginButton"
import Logo from "./_LogoButton"
import ProfileButton from "./ProfileButton"

const Header = () => {
    debugRender("Header")
    const me = useGlobalStore((state) => state.me)
    const setIsSidebarOn = useGlobalStore((state) => state.setIsSidebarOn)

    return (
        <div className="text-my-sm border-b-border-dim border-b">
            <Hstack className="p-my-md items-center justify-between">
                <Button onClick={() => setIsSidebarOn(true)}>
                    <PanelLeft />
                </Button>
                <Logo />
                {me && <ProfileButton />}
                {!me && <KakaoLoginButton />}
            </Hstack>
        </div>
    )
}

export default Header
