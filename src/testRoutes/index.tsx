import { lazy, Suspense } from "react"
const ApiTestPage = lazy(() => import("./_ApiTestPage"))
const ButtonTestPage = lazy(() => import("./_ButtonTestPage.tsx"))
const AnimationTestPage = lazy(() => import("./_AnimationTestPage.tsx"))
const AnimationExamplePage = lazy(() => import("./_AnimationExamplePage.tsx"))
const AnimationEventTestPage = lazy(() => import("./_AnimationEventTestPage.tsx"))
const AutoCompleteTestPage = lazy(() => import("./_AutoCompleteTestPage.tsx"))

const testRouteArray = [
    {
        path: "/test/api",
        element: <ApiTestPage />,
    },
    {
        path: "/test/button",
        element: <ButtonTestPage />,
    },
    {
        path: "/test/animation",
        element: <AnimationTestPage />,
    },
    {
        path: "/test/animation/example",
        element: <AnimationExamplePage />,
    },
    {
        path: "/test/animation/event",
        element: <AnimationEventTestPage />,
    },
    {
        path: "/test/auto-complete",
        element: <AutoCompleteTestPage />,
    },
]

const suspendedTestRouteArray = testRouteArray.map((route) => ({
    path: route.path,
    element: <Suspense>{route.element}</Suspense>,
}))

export default suspendedTestRouteArray
