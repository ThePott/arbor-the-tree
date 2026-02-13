import { debugStore } from "@/shared/config/debug/"
import type { Classroom } from "@/shared/interfaces"
import { create } from "zustand"

type ModalKey = "deleteClassroom"
type ManageStudentStoreState = {
    modalKey: ModalKey | null
    setModalKey: (modalKey: ModalKey | null) => void

    selectedClassroom: Classroom | null
    setSelectedClassroom: (selectedClassroom: Classroom | null) => void
}

const useManageStudentStore = create<ManageStudentStoreState>()((set, _get) => ({
    modalKey: null,
    setModalKey: (modalKey) => {
        debugStore("ManageStudentStore:setModalKey %o", modalKey)
        set({ modalKey })
    },

    selectedClassroom: null,
    setSelectedClassroom: (selectedClassroom) => {
        debugStore("ManageStudentStore:setSelectedClassroom %o", selectedClassroom)
        set({ selectedClassroom })
    },
}))

export default useManageStudentStore
