import createDebug from "debug"

// Render debugging - component re-renders
export const debugRender = createDebug("arbor:render")

// Mutation debugging - React Query mutations
export const debugMutation = createDebug("arbor:mutation")

// Cache debugging - optimistic updates, cache changes
export const debugCache = createDebug("arbor:cache")

// Form debugging - form submissions, validation
export const debugForm = createDebug("arbor:form")

// Store debugging - Zustand store changes
export const debugStore = createDebug("arbor:store")
