import Button from "@/packages/components/Button/Button"
import Dropdown from "@/packages/components/Dropdown/Dropdown"
import useGlobalStore from "@/shared/store/globalStore"
import { useNavigate } from "react-router"
import useLogoutMutation from "./_useLogoutMutation"

const ProfileButton = () => {
    const me = useGlobalStore((state) => state.me)
    const navigate = useNavigate()
    const { mutate: logoutMutate } = useLogoutMutation()

    const handleChange = (value: string) => {
        switch (value) {
            case "mypage":
                navigate("/mypage")
                break
            case "logout":
                logoutMutate()
                break
            default:
                break
        }
    }

    if (!me) {
        return <p>null me in profile ---- this should not be shown</p>
    }
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <Button>{me.name}</Button>
            </Dropdown.Trigger>
            <Dropdown.Menu onChange={handleChange}>
                <Dropdown.MenuItem value="mypage">마이페이지</Dropdown.MenuItem>
                <Dropdown.MenuItem value="logout">로그아웃</Dropdown.MenuItem>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ProfileButton
