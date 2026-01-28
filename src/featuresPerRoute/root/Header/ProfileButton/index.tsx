import Button from "@/packages/components/Button/Button"
import Dropdown from "@/packages/components/Dropdown/Dropdown"
import { debugRender } from "@/shared/config/debug/debug"
import { ClientError } from "@/shared/error/clientError"
import useGlobalStore from "@/shared/store/globalStore"
import { useNavigate } from "@tanstack/react-router"

const ProfileButton = () => {
    debugRender("ProfileButton")
    const me = useGlobalStore((state) => state.me)
    const logout = useGlobalStore((state) => state.logout)
    const navigate = useNavigate()

    const handleChange = (value: string) => {
        switch (value) {
            case "profile":
                navigate({ to: "/profile" })
                break
            case "logout":
                logout()
                break
            default:
                break
        }
    }

    if (!me) throw ClientError.Unexpected("프로필 버튼이 보이는데 me가 없어요")

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <Button>{me.name}</Button>
            </Dropdown.Trigger>
            <Dropdown.Menu onChange={handleChange}>
                <Dropdown.MenuItem value="profile">프로필</Dropdown.MenuItem>
                <Dropdown.MenuItem value="logout">로그아웃</Dropdown.MenuItem>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ProfileButton
