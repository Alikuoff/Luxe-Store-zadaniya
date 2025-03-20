"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/translations"

export default function Home() {
  const { language } = useLanguage()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl space-y-6 hero-text">
            <h1 className="text-4xl md:text-6xl font-serif text-white">{getTranslation(language, "heroTitle")}</h1>
            <p className="text-lg text-white/90">{getTranslation(language, "heroDescription")}</p>
            <div className="pt-4">
              <Link href="/products">
                <Button size="lg" className="rounded-none px-8 py-6 text-lg">
                  {getTranslation(language, "shopCollection")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif text-center mb-16">{getTranslation(language, "featuredCategories")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: getTranslation(language, "electronics"),
                key: "electronics",
                image:
                  "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              },
              {
                name: getTranslation(language, "jewelry"),
                key: "jewelry",
                image:
                  "https://images.pexels.com/photos/230290/pexels-photo-230290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              },
              {
                name: getTranslation(language, "fashion"),
                key: "fashion",
                image:
                  "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              },
            ].map((category) => (
              <div key={category.key} className="group relative overflow-hidden">
                <div className="aspect-square bg-muted relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-2xl font-serif text-white">{category.name}</h3>
                    <Link href={`/products?category=${category.key.toLowerCase()}`}>
                      <Button variant="link" className="text-white mt-2 group-hover:underline">
                        {getTranslation(language, "explore")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-square bg-muted relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.pexels.com/photos/6707628/pexels-photo-6707628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
                  }}
                />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-serif">{getTranslation(language, "ourPhilosophy")}</h2>
              <p className="text-muted-foreground">{getTranslation(language, "philosophyText1")}</p>
              <p className="text-muted-foreground">{getTranslation(language, "philosophyText2")}</p>
              <div className="pt-4">
                <Link href="/products">
                  <Button variant="outline" className="rounded-none">
                    {getTranslation(language, "discoverProducts")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif mb-4">{getTranslation(language, "joinCommunity")}</h2>
          <p className="max-w-2xl mx-auto mb-8">{getTranslation(language, "newsletterText")}</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={getTranslation(language, "emailPlaceholder")}
              className="px-4 py-2 flex-grow bg-primary-foreground text-primary rounded-none"
            />
            <Button className="rounded-none">{getTranslation(language, "subscribe")}</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

