import Button from "@/packages/components/Button"
import Dropdown from "@/packages/components/Dropdown/Dropdown"
import { Hstack, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import useGlobalStore from "@/shared/store/globalStore"

const Header = () => {
    const me = useGlobalStore((state) => state.me)
    const isLoggedIn = Boolean(me)

    const on

    return (
        <div className="text-my-xl">
            <Hstack className="justify-between">
                <p>ARBOR</p>
            </Hstack>
        </div>
    )
}

export default Header
