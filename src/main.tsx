import { createRoot } from "react-dom/client"
import "./index.css"
import { lazy, Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router"
import suspendedTestRouteArray from "./testRoutes/index.tsx"

const LandingPage = lazy(() => import("./pages/landing/LandingPage.tsx"))
const SummaryPage = lazy(() => import("./pages/summary/SummaryPage.tsx"))
const ProgressPage = lazy(() => import("./pages/progress/ProgressPage.tsx"))

const routeArray = [
    {
        path: "/",
        element: <LandingPage />,
        fallback: <p>여기에 스켈레톤을 넣어야 합니다</p>,
    },
    {
        path: "/summary",
        element: <SummaryPage />,
        fallback: <p>여기에 스켈레톤을 넣어야 합니다</p>,
    },
    {
        path: "/progress",
        element: <ProgressPage />,
        fallback: <p>여기에 스켈레톤을 넣어야 합니다</p>,
    },
]

const suspendedRouteArray = routeArray.map((route) => ({
    path: route.path,
    element: <Suspense fallback={route.fallback}>{route.element}</Suspense>,
}))

const router = createBrowserRouter([...suspendedRouteArray, ...suspendedTestRouteArray])

createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />)
