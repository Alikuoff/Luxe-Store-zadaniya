"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, ShoppingBag, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useProductStore } from "@/lib/store"
import { useState, useCallback, useEffect, useRef } from "react"
import { CartDropdown } from "@/components/cart-dropdown"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/translations"

export function Navbar() {
  const pathname = usePathname()
  const { likedProducts, getCartItemCount } = useProductStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const { language } = useLanguage()
  const isMounted = useRef(true)

  // Set up the mounted ref
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  // Update cart count on initial render
  useEffect(() => {
    if (isMounted.current) {
      setCartCount(getCartItemCount())
    }
  }, [getCartItemCount])

  // Manual subscription to cartItems changes
  useEffect(() => {
    const handleCartChange = () => {
      if (isMounted.current) {
        setCartCount(getCartItemCount())
      }
    }

    // Set up subscription
    const unsubscribe = useProductStore.subscribe((state) => {
      if (state.cartItems) {
        handleCartChange()
      }
    })

    return () => {
      unsubscribe()
    }
  }, [getCartItemCount])

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev)
  }, [])

  const toggleCart = useCallback(() => {
    setCartOpen((prev) => !prev)
  }, [])

  const navLinks = [
    { href: "/", label: getTranslation(language, "home") },
    { href: "/products", label: getTranslation(language, "shop") },
    { href: "/create-product", label: getTranslation(language, "addProduct") },
  ]

  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-serif tracking-tight">LUXE</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm uppercase tracking-wider hover:text-primary/80 transition-colors ${
                  pathname === link.href ? "font-medium" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />

            <Link href="/products?filter=liked" className="relative">
              <Button variant="ghost" size="icon" className="rounded-full" type="button">
                <Heart className="h-5 w-5" />
                {likedProducts.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {likedProducts.length}
                  </span>
                )}
              </Button>
            </Link>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={toggleCart}
                type="button"
                data-cart-toggle="true"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>

              {cartOpen && <CartDropdown onClose={() => setCartOpen(false)} />}
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={toggleMobileMenu}
              type="button"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden py-4 px-4 bg-background border-t">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm uppercase tracking-wider hover:text-primary/80 transition-colors ${
                  pathname === link.href ? "font-medium" : ""
                }`}
                onClick={toggleMobileMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

