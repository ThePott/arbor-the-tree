import type { Me } from "@/features/profile/type/indes"
import { headlessInstance } from "@/packages/api/axiosInstances"
import Button from "@/packages/components/Button/Button"
import Input from "@/packages/components/Input/Input"
import { Container, FlexOneContainer, Vstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import type { ApiError } from "@/shared/interfaces"
import useGlobalStore from "@/shared/store/globalStore"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { AxiosResponse, type AxiosError } from "axios"
import useTestLoginStore from "../store"
import TestLoginErrorModal from "./TestLoginErrorModal"
import TestLoginSuccessModal from "./TestLoginSuccessModal"

type TestLoginProps = {
    email: string
    password: string
}
type WithSignupProps = {
    name: string
}

const TestLoginPage = () => {
    const setMe = useGlobalStore((state) => state.setMe)
    const setAccessToken = useGlobalStore((state) => state.setAccessToken)

    const setModalKey = useTestLoginStore((state) => state.setModalKey)
    const setError = useTestLoginStore((state) => state.setError)

    const navigate = useNavigate()

    const { mutate: mutateSignup, isPending: isPendingSignup } = useMutation<
        unknown,
        AxiosError<ApiError>,
        TestLoginProps & WithSignupProps
    >({
        mutationFn: (body) => headlessInstance.post("/auth/email/signup", body),
        onSuccess: (_data, _variables, _onMutateResult, _context) => {
            setModalKey("signupSuccess")
        },
        onError: (error, _variables, _onMutateResult, _context) => {
            setError(error)
        },
    })
    const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation<
        AxiosResponse<{ me: Me; access_token: string }>,
        AxiosError<ApiError>,
        TestLoginProps
    >({
        mutationFn: (body) => headlessInstance.post("/auth/email/login", body),
        onSuccess: (data, _variables, _onMutateResult, _context) => {
            const { me, access_token } = data.data
            setMe(me)
            setAccessToken(access_token)
            navigate({ to: "/" })
        },
        onError: (error, _variables, _onMutateResult, _context) => {
            setError(error)
        },
    })

    const handleCreateSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const userName = event.currentTarget.userName.value
        const email = event.currentTarget.email.value
        const password = event.currentTarget.password.value
        mutateSignup({ email, password, name: userName })
    }
    const handleTestLoginSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const email = event.currentTarget.email.value
        const password = event.currentTarget.password.value
        mutateLogin({ email, password })
    }

    return (
        <>
            <FlexOneContainer isYScrollable className="h-full [scrollbar-gutter:stable]">
                <Container isPadded>
                    <RoundBox isShadowed radius="lg" padding="xl" color="bg0">
                        <Vstack gap="lg">
                            <form onSubmit={handleCreateSubmit}>
                                <RoundBox isShadowed padding="lg" color="bg1">
                                    <Vstack gap="xs">
                                        <Title as="h2" isMuted>
                                            create new account
                                        </Title>
                                        <Input name="userName" placeholder="userName" />
                                        <Input name="email" placeholder="email" />
                                        <Input name="password" placeholder="password" />
                                        <Button
                                            isShadowed
                                            color="green"
                                            status={isPendingSignup ? "pending" : "enabled"}
                                        >
                                            Create new account
                                        </Button>
                                    </Vstack>
                                </RoundBox>
                            </form>
                            <form onSubmit={handleTestLoginSubmit}>
                                <RoundBox isShadowed padding="lg" color="bg1">
                                    <Vstack gap="xs">
                                        <Title as="h2" isMuted>
                                            login with email
                                        </Title>
                                        <Input name="email" placeholder="email" />
                                        <Input name="password" placeholder="password" />
                                        <Button isShadowed status={isPendingLogin ? "pending" : "enabled"}>
                                            TestLogin with email
                                        </Button>
                                    </Vstack>
                                </RoundBox>
                            </form>
                        </Vstack>
                    </RoundBox>
                </Container>
            </FlexOneContainer>
            <TestLoginErrorModal />
            <TestLoginSuccessModal />
        </>
    )
}

export default TestLoginPage
