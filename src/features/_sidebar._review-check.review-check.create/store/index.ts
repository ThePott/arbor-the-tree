import type { ReviewCheckStatus } from "@/shared/interfaces"
import { create } from "zustand"

type ReviewCheckCreateStoreState = {
    status: ReviewCheckStatus | null
    setStatus: (status: ReviewCheckStatus | null) => void
}
const useReviewCheckCreateStore = create<ReviewCheckCreateStoreState>()((set, _get) => ({
    status: null,
    setStatus: (status) => set({ status }),
}))

export default useReviewCheckCreateStore
