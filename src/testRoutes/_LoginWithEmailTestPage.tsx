import { headlessInstance } from "@/packages/api/axiosInstances"
import Button from "@/packages/components/Button/Button"
import Input from "@/packages/components/Input/Input"
import { Container, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import useGlobalStore from "@/shared/store/globalStore"
import { useLayoutEffect } from "react"
import { useNavigate } from "react-router"

type LoginProps = {
    email: string
    password: string
}
type WithSignupProps = {
    name: string
}
const requestSignup = async (body: LoginProps & WithSignupProps) => {
    const response = await headlessInstance.post("/auth/email/signup", body)
    console.log(response.data)
    debugger
}
const requestLogin = async (body: LoginProps) => {
    const response = await headlessInstance.post("/auth/email/login", body)
    console.log(response.data)
    debugger
}

const LoginWithEmailTestPage = () => {
    const me = useGlobalStore((state) => state.me)
    const navigate = useNavigate()

    useLayoutEffect(() => {
        if (me) return
        navigate("/")
    }, [me])

    const handleCreateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const userName = event.currentTarget.userName.value
        const email = event.currentTarget.email.value
        const password = event.currentTarget.password.value
        requestSignup({ email, password, name: userName })
    }
    const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        debugger
        event.preventDefault()
        requestLogin({ email, password })
    }

    return (
        <Container isPadded>
            <RoundBox isShadowed radius="lg" padding="xl">
                <Vstack gap="lg">
                    <form onSubmit={handleCreateSubmit}>
                        <RoundBox isShadowed padding="md">
                            <Vstack gap="xs">
                                <Title as="h2" isMuted>
                                    create new account
                                </Title>
                                <Input name="userName" placeholder="userName" />
                                <Input name="email" placeholder="email" />
                                <Input name="password" placeholder="password" />
                                <Button isShadowed color="green">
                                    Create new account
                                </Button>
                            </Vstack>
                        </RoundBox>
                    </form>
                    <form onSubmit={handleLoginSubmit}>
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
                    </form>
                </Vstack>
            </RoundBox>
        </Container>
    )
}

export default LoginWithEmailTestPage
