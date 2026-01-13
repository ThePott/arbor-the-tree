export const MANAGE_DELETE_ROW_KEY_ARRAY = ["name", "role", "phone_number"] as const
type ManageDeleteRowKey = (typeof MANAGE_DELETE_ROW_KEY_ARRAY)[number]
export const MANAGE_DELETE_ROW_KET_TO_LABEL: Record<ManageDeleteRowKey, string> = {
    name: "이름",
    role: "권한",
    phone_number: "연락처",
}
export type ManageDeleteRow = Record<ManageDeleteRowKey, string | undefined> & { id: string }
