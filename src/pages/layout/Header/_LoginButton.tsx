import Button from "@/packages/components/Button"
import Dropdown from "@/packages/components/Dropdown/Dropdown"
import { Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"

const LoginButton = () => {
    const handleChange = (_value: string) => {}

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <Button>로그인</Button>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <RoundBox color="bg3" isShadowed padding="lg">
                    <Vstack>
                        <Button>카카오로 로그인</Button>
                        <Button>이메일로 로그인</Button>
                    </Vstack>
                </RoundBox>
            </Dropdown.Content>
        </Dropdown>
    )
}

export default LoginButton
