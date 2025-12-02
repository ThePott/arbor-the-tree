import Button from "@/packages/components/Button"
import Dropdown from "@/packages/components/Dropdown/Dropdown"

const LoginButton = () => {
    return (
        <Dropdown>
            <Dropdown.Trigger>
                <Button>로그인</Button>
            </Dropdown.Trigger>
            <Dropdown.Menu onChange={() => {}}>
                <Dropdown.MenuItem value="_kakao">
                    <Button isWide>카카오로 로그인</Button>
                </Dropdown.MenuItem>
                <Dropdown.MenuItem value="_email">
                    <Button isWide>이메일로 로그인</Button>
                </Dropdown.MenuItem>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default LoginButton
