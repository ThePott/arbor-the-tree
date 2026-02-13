import OauthKakaoCallbackError from "@/features/oauth.kakao.callback/error/OauthKakaoCallbackError"
import oauthKakaoCallbakLoaderFn from "@/features/oauth.kakao.callback/loader/oauthKakaoCallbackLoaderFn"
import OauthKakaoCallbackPending from "@/features/oauth.kakao.callback/pending/OauthKakaoCallbackPending"
import { createFileRoute } from "@tanstack/react-router"
import z from "zod/v3"

export const Route = createFileRoute("/oauth/kakao/callback")({
    validateSearch: z.object({
        code: z.string().optional(),
    }),
    beforeLoad: ({ search: { code } }) => oauthKakaoCallbakLoaderFn({ code }),
    pendingComponent: OauthKakaoCallbackPending,
    errorComponent: OauthKakaoCallbackError,
})
