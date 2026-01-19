import { Hstack } from "@/packages/components/layouts"
import { debugRender } from "@/shared/config/debug/debug"
import useGlobalStore from "@/shared/store/globalStore"
import KakaoLoginButton from "./_KakaoLoginButton"
import Logo from "./_LogoButton"
import ProfileButton from "./ProfileButton"

const Header = () => {
    debugRender("Header")
    const me = useGlobalStore((state) => state.me)

    return (
        <div className="text-my-sm border-b-border-dim border-b">
            <Hstack className="p-my-md items-center justify-between">
                <Logo />
                {me && <ProfileButton />}
                {!me && <KakaoLoginButton />}
            </Hstack>
        </div>
    )
}

export default Header
