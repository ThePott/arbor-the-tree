import { Hstack } from "@/packages/components/layouts"
import LoginButton from "./_LoginButton"
import Logo from "./_LogoButton"

const Header = () => {
    // const me = useGlobalStore((state) => state.me)
    // const isLoggedIn = Boolean(me)

    return (
        <div className="text-my-sm border-b-border-dim border-b">
            <Hstack className="p-my-md items-center justify-between">
                <Logo />
                <LoginButton />
            </Hstack>
        </div>
    )
}

export default Header
