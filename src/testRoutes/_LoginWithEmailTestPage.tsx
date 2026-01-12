import Button from "@/packages/components/Button/Button"
import Input from "@/packages/components/Input/Input"
import { Container, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"

const LoginWithEmailTestPage = () => {
    return (
        <Container isPadded>
            <RoundBox isShadowed radius="lg" padding="xl">
                <Vstack gap="lg">
                    <RoundBox isShadowed padding="md">
                        <Vstack gap="xs">
                            <Title as="h2" isMuted>
                                create new account
                            </Title>
                            <Input placeholder="email" />
                            <Input placeholder="password" />
                            <Button isShadowed color="green">
                                Create new account
                            </Button>
                        </Vstack>
                    </RoundBox>
                    <RoundBox isShadowed padding="md">
                        <Vstack gap="xs">
                            <Title as="h2" isMuted>
                                login with email
                            </Title>
                            <Input placeholder="email" />
                            <Input placeholder="login" />
                            <Button isShadowed>Login with email</Button>
                        </Vstack>
                    </RoundBox>
                </Vstack>
            </RoundBox>
        </Container>
    )
}

export default LoginWithEmailTestPage
