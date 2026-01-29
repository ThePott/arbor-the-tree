import { create } from "zustand"
import type { AssignedJoinedSyllabus } from "../types"

type ProgressStoreState = {
    modalKey: "deleteAssginedSyllabus" | null
    setModalKey: (modalKey: "deleteAssginedSyllabus" | null) => void

    selectedSyllabus: AssignedJoinedSyllabus | null
    setSelectedSyllabus: (selectedSyllabus: AssignedJoinedSyllabus | null) => void
}
const useProgressStore = create<ProgressStoreState>()((set, _get) => ({
    modalKey: null,
    setModalKey: (modalKey) => set({ modalKey }),

    selectedSyllabus: null,
    setSelectedSyllabus: (selectedSyllabus) => set({ selectedSyllabus }),
}))

export default useProgressStore
