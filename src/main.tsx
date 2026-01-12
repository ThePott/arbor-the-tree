import ReactDOM from "react-dom/client"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import "./index.css"
import { routeTree } from "./routeTree.gen"
import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "./packages/api/queryClient"
import DefaultError from "./shared/error/DefaultError"
import DefaultNotFound from "./shared/error/DefaultNotFound"

// Create a new router instance
const router = createRouter({
    routeTree,
    defaultPendingMs: 0,
    context: { queryClient },
    defaultErrorComponent: ({ error, reset }) => DefaultError({ error, reset }),
    defaultNotFoundComponent: DefaultNotFound,
})

// Register the router instance for type safety
declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}

// Render the app
const rootElement = document.getElementById("root")!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    )
}
