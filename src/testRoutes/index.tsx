import { lazy, Suspense } from "react"
import TabTestPage from "./_TabTestPage.tsx"
const ResumeTestPage = lazy(() => import("./_ResumeTestPage.tsx"))
const ApiTestPage = lazy(() => import("./_ApiTestPage"))
const ButtonTestPage = lazy(() => import("./_ButtonTestPage.tsx"))
const AnimationTestPage = lazy(() => import("./_AnimationTestPage.tsx"))
const AnimationExamplePage = lazy(() => import("./_AnimationExamplePage.tsx"))
const AnimationEventTestPage = lazy(() => import("./_AnimationEventTestPage.tsx"))
const AutoCompleteTestPage = lazy(() => import("./_AutoCompleteTestPage.tsx"))
const DropdownTestPage = lazy(() => import("./_DropdownTestPage.tsx"))

const testRouteArray = [
    { path: "/test/api", element: <ApiTestPage /> },
    { path: "/test/button", element: <ButtonTestPage /> },
    { path: "/test/animation", element: <AnimationTestPage /> },
    { path: "/test/animation/example", element: <AnimationExamplePage /> },
    { path: "/test/animation/event", element: <AnimationEventTestPage /> },
    { path: "/test/auto-complete", element: <AutoCompleteTestPage /> },
    { path: "/test/dropdown", element: <DropdownTestPage /> },
    { path: "/test/resume", element: <ResumeTestPage /> },
    { path: "/test/tab", element: <TabTestPage /> },
]

const suspendedTestRouteArray = testRouteArray.map((route) => ({
    path: route.path,
    element: <Suspense>{route.element}</Suspense>,
}))

export default suspendedTestRouteArray
