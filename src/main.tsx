import { createRoot } from "react-dom/client"
import "./index.css"
import { lazy, Suspense } from "react"
import { createBrowserRouter, RouterProvider } from "react-router"
import suspendedTestRouteArray from "./testRoutes/index.tsx"
import Layout from "./pages/layout/Layout.tsx"
import NotFoundPage from "./pages/error/NotFoundPage.tsx"
import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "./packages/api/queryClient.ts"
import LandingPage from "./pages/landing/LandingPage.tsx"
const SummaryPage = lazy(() => import("./pages/summary/SummaryPage.tsx"))
const ProgressPage = lazy(() => import("./pages/progress/ProgressPage.tsx"))
const Mypage = lazy(() => import("./pages/mypage/Mypage.tsx"))

const routeArray = [
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
    { path: "/mypage", element: <Mypage />, fallback: <p>여기에 스켈레톤을 넣어야 합니다</p> },
]

const suspendedRouteArray = routeArray.map((route) => ({
    path: route.path,
    element: <Suspense fallback={route.fallback}>{route.element}</Suspense>,
}))

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            ...suspendedRouteArray,
            ...suspendedTestRouteArray,
            {
                path: "/",
                element: <LandingPage />,
            },
            {
                path: "*",
                element: <NotFoundPage />,
            },
        ],
    },
])

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
)
