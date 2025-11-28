import { lazy, Suspense } from "react"
const ApiTestPage = lazy(() => import("./_ApiTestPage"))

const testRouteArray = [
    {
        path: "/test/api",
        element: <ApiTestPage />,
    },
]

const suspendedTestRouteArray = testRouteArray.map((route) => ({
    path: route.path,
    element: <Suspense>{route.element}</Suspense>,
}))

export default suspendedTestRouteArray
