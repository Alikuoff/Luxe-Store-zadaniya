"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Language } from "./translations"
import { getClientStorage, setClientStorage } from "./client-utils"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Start with a default language to avoid hydration mismatch
  const [language, setLanguageState] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  // Only run effects on the client side after hydration
  useEffect(() => {
    setMounted(true)
    const savedLanguage = getClientStorage("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ru" || savedLanguage === "uz")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (mounted) {
      setClientStorage("language", lang)
    }
  }

  const value = {
    language,
    setLanguage,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

