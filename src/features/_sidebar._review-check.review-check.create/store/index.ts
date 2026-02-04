import { create } from "zustand"

type ReviewCheckCreateStoreState = {
    status: "CORRECT" | "WRONG" | null
    setStatus: (status: "CORRECT" | "WRONG" | null) => void
}
const useReviewCheckCreateStore = create<ReviewCheckCreateStoreState>()((set, _get) => ({
    status: null,
    setStatus: (status) => set({ status }),
}))

export default useReviewCheckCreateStore
