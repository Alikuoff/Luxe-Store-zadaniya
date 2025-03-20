"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  // Add client-side rendering safety
  const [mounted, setMounted] = useState(false)

  // Only show the correct UI when mounted on client
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder to prevent layout shift
    return (
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-full bg-secondary"></div>
        <div className="h-8 w-8 rounded-full bg-secondary"></div>
        <div className="h-8 w-8 rounded-full bg-secondary"></div>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={language === "en" ? "default" : "outline"}
        size="sm"
        className="text-xs rounded-full px-3"
        onClick={() => setLanguage("en")}
        type="button"
      >
        EN
      </Button>
      <Button
        variant={language === "ru" ? "default" : "outline"}
        size="sm"
        className="text-xs rounded-full px-3"
        onClick={() => setLanguage("ru")}
        type="button"
      >
        RU
      </Button>
      <Button
        variant={language === "uz" ? "default" : "outline"}
        size="sm"
        className="text-xs rounded-full px-3"
        onClick={() => setLanguage("uz")}
        type="button"
      >
        UZ
      </Button>
    </div>
  )
}

