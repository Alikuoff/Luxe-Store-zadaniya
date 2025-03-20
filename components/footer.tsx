"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/translations"

export function Footer() {
  const { language } = useLanguage()

  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-serif">LUXE</h3>
            <p className="text-sm text-muted-foreground">
              {language === "en"
                ? "Curated collection of premium products for the discerning customer."
                : language === "ru"
                  ? "Подборка премиальных товаров для взыскательного клиента."
                  : "Tanlab olingan premium mahsulotlar kolleksiyasi talabchan mijozlar uchun."}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium uppercase tracking-wider">{getTranslation(language, "shop")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  {getTranslation(language, "allProducts")}
                </Link>
              </li>
              <li>
                <Link
                  href="/products?filter=liked"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {getTranslation(language, "favorites")}
                </Link>
              </li>
              <li>
                <Link href="/create-product" className="text-muted-foreground hover:text-foreground transition-colors">
                  {getTranslation(language, "addProduct")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium uppercase tracking-wider">
              {language === "en" ? "Company" : language === "ru" ? "Компания" : "Kompaniya"}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {getTranslation(language, "aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {getTranslation(language, "contact")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {getTranslation(language, "careers")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium uppercase tracking-wider">
              {language === "en" ? "Legal" : language === "ru" ? "Юридическая информация" : "Huquqiy ma'lumot"}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {getTranslation(language, "termsOfService")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {getTranslation(language, "privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  {getTranslation(language, "cookiePolicy")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} LUXE. {getTranslation(language, "allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  )
}

