import Button from "@/packages/components/Button"
import Dropdown from "@/packages/components/Dropdown/Dropdown"

const LoginButton = () => {
    const handleChange = (_value: string) => {}

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <Button>로그인</Button>
            </Dropdown.Trigger>
            <Dropdown.Menu onChange={handleChange}>
                <Dropdown.MenuItem value="kakao">
                    <Button>카카오로 로그인</Button>
                </Dropdown.MenuItem>
                <Dropdown.MenuItem value="email">
                    <Button>이메일로 로그인</Button>
                </Dropdown.MenuItem>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default LoginButton
