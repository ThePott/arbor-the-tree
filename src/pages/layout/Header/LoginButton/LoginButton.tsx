import Dropdown from "@/packages/components/Dropdown/Dropdown"
import KakaoLoginButton from "./_KakaoLoginButton"
import Button from "@/packages/components/Button/Button"
import useGlobalStore from "@/shared/store/globalStore"

const LoginButton = () => {
    const isPendingLogin = useGlobalStore((state) => state.isPendingLogin)
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <Button status={isPendingLogin ? "pending" : "enabled"}>로그인</Button>
            </Dropdown.Trigger>
            <Dropdown.Menu onChange={() => {}}>
                <Dropdown.MenuItem value="_kakao">
                    <KakaoLoginButton />
                </Dropdown.MenuItem>
                <Dropdown.MenuItem value="_email">
                    <Button isWide>이메일로 로그인</Button>
                </Dropdown.MenuItem>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default LoginButton
