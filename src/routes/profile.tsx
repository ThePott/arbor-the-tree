import profileLoaderFn from "@/features/profile/loader/profileLoaderFn"
import ProfilePage from "@/features/profile/page/ProfilePage"
import ProfilePending from "@/features/profile/pending/ProfilePending"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/profile")({
    component: () => ProfilePage(),
    pendingComponent: ProfilePending,
    loader: async ({ context: { queryClient } }) => profileLoaderFn({ queryClient }),
})
