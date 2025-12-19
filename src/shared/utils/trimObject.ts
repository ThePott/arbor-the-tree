export const trimObject = <T extends Record<string, unknown>>(obj: T) =>
    Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== undefined)) as T
