import profileLoaderFn from "@/featuresPerRoute/profile/loader/profileLoaderFn"
import ProfilePage from "@/featuresPerRoute/profile/page/ProfilePage"
import ProfilePending from "@/featuresPerRoute/profile/pending/ProfilePending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/profile")({
    component: () => ProfilePage(),
    pendingComponent: ProfilePending,
    loader: async ({ context: { queryClient } }) => profileLoaderFn({ queryClient }),
})
