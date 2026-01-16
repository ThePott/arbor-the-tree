import { create } from "zustand"
import type { ExtendedClassroom } from "../types"

type ModalKey = "deleteClassroom"
type ManageStudentStoreState = {
    modalKey: ModalKey | null
    setModalKey: (modalKey: ModalKey | null) => void

    selectedClassroom: ExtendedClassroom | null
    setSelectedClassroom: (selectedClassroom: ExtendedClassroom | null) => void
}

const useManageStudentStore = create<ManageStudentStoreState>()((set, _get) => ({
    modalKey: null,
    setModalKey: (modalKey) => set({ modalKey }),

    selectedClassroom: null,
    setSelectedClassroom: (selectedClassroom) => set({ selectedClassroom }),
}))

export default useManageStudentStore
