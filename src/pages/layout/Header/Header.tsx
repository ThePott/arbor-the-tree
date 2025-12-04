import { Hstack } from "@/packages/components/layouts"
import Logo from "./_LogoButton"
import LoginButton from "./LoginButton/LoginButton"
import useGlobalStore from "@/shared/store/globalStore"
import ProfileButton from "./ProfileButton/ProfileButton"

const Header = () => {
    const me = useGlobalStore((state) => state.me)

    return (
        <div className="text-my-sm border-b-border-dim border-b">
            <Hstack className="p-my-md items-center justify-between">
                <Logo />
                {me && <ProfileButton />}
                {!me && <LoginButton />}
            </Hstack>
        </div>
    )
}

export default Header
