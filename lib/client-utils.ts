// Helper to safely access window/localStorage on the client side
export function getClientStorage(key: string): string | null {
  if (typeof window === "undefined") {
    return null
  }

  try {
    return localStorage.getItem(key)
  } catch (e) {
    console.error("Error accessing localStorage:", e)
    return null
  }
}

export function setClientStorage(key: string, value: string): void {
  if (typeof window === "undefined") {
    return
  }

  try {
    localStorage.setItem(key, value)
  } catch (e) {
    console.error("Error writing to localStorage:", e)
  }
}

// Helper to check if we're on the client side
export const isClient = typeof window !== "undefined"

