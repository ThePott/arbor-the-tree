import { Hstack } from "@/packages/components/layouts"
import Logo from "./_LogoButton"
import useGlobalStore from "@/shared/store/globalStore"
import ProfileButton from "./ProfileButton"
import KakaoLoginButton from "./_KakaoLoginButton"

const Header = () => {
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
