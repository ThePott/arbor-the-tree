import { lazy, Suspense } from "react"
import ModalTestPage from "./_ModalTestPage.tsx"
const TabTestPage = lazy(() => import("./_TabTestPage.tsx"))
const TableTestPage = lazy(() => import("./_TableTestPage.tsx"))
const ResumeTestPage = lazy(() => import("./_ResumeTestPage.tsx"))
const ApiTestPage = lazy(() => import("./_ApiTestPage"))
const ButtonTestPage = lazy(() => import("./_ButtonTestPage.tsx"))
const AnimationTestPage = lazy(() => import("./_AnimationTestPage.tsx"))
const AnimationExamplePage = lazy(() => import("./_AnimationExamplePage.tsx"))
const AnimationEventTestPage = lazy(() => import("./_AnimationEventTestPage.tsx"))
const DropdownTestPage = lazy(() => import("./_DropdownTestPage.tsx"))

const testRouteArray = [
    { path: "/test/api", element: <ApiTestPage /> },
    { path: "/test/button", element: <ButtonTestPage /> },
    { path: "/test/animation", element: <AnimationTestPage /> },
    { path: "/test/animation/example", element: <AnimationExamplePage /> },
    { path: "/test/animation/event", element: <AnimationEventTestPage /> },
    { path: "/test/dropdown", element: <DropdownTestPage /> },
    { path: "/test/resume", element: <ResumeTestPage /> },
    { path: "/test/tab", element: <TabTestPage /> },
    { path: "/test/table", element: <TableTestPage /> },
    { path: "/test/modal", element: <ModalTestPage /> },
]

const suspendedTestRouteArray = testRouteArray.map((route) => ({
    path: route.path,
    element: <Suspense>{route.element}</Suspense>,
}))

export default suspendedTestRouteArray
