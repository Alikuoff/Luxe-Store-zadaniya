"use client"

import { useProductStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Minus, Plus, X, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useMemo, useRef } from "react"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/translations"

interface CartDropdownProps {
  onClose: () => void
}

export function CartDropdown({ onClose }: CartDropdownProps) {
  const { cartItems, products, removeFromCart, updateCartItemQuantity, getCartTotal, clearCart } = useProductStore()
  const [total, setTotal] = useState(0)
  const { language } = useLanguage()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const isMounted = useRef(true)

  // Set up the mounted ref
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  // Memoize the cart items to prevent unnecessary re-renders
  const cartItemsWithDetails = useMemo(() => {
    return cartItems
      .map((item) => {
        const product = products.find((p) => p.id === item.productId)
        return {
          ...item,
          product,
        }
      })
      .filter((item) => item.product !== undefined)
  }, [cartItems, products])

  useEffect(() => {
    if (isMounted.current) {
      setTotal(getCartTotal())
    }
  }, [cartItems, getCartTotal])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!isMounted.current) return

      const target = e.target as HTMLElement

      // Check if the click is outside the dropdown and not on the toggle button
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        !target.closest('button[data-cart-toggle="true"]')
      ) {
        onClose()
      }
    }

    // Add the event listener directly - no timeout
    document.addEventListener("mousedown", handleClickOutside)

    // Clean up function
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onClose])

  // Safe handler functions
  const handleRemoveItem = (productId: number) => {
    if (isMounted.current) {
      removeFromCart(productId)
    }
  }

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    if (isMounted.current) {
      updateCartItemQuantity(productId, quantity)
    }
  }

  const handleClearCart = () => {
    if (isMounted.current) {
      clearCart()
    }
  }

  if (cartItemsWithDetails.length === 0) {
    return (
      <div
        ref={dropdownRef}
        className="cart-dropdown absolute right-0 top-full mt-2 w-80 bg-white border shadow-lg rounded-md p-4 z-50"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">{getTranslation(language, "yourCart")}</h3>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="py-8 text-center">
          <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">{getTranslation(language, "cartEmpty")}</p>
          <Link href="/products">
            <Button variant="link" onClick={onClose} className="mt-2">
              {getTranslation(language, "continueShopping")}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={dropdownRef}
      className="cart-dropdown absolute right-0 top-full mt-2 w-96 bg-white border shadow-lg rounded-md p-4 z-50"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">
          {getTranslation(language, "yourCart")} ({cartItems.reduce((sum, item) => sum + item.quantity, 0)}{" "}
          {getTranslation(language, "items")})
        </h3>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="max-h-80 overflow-y-auto space-y-4">
        {cartItemsWithDetails.map((item) => (
          <div key={item.productId} className="flex gap-3 py-3 border-b">
            <div className="relative h-16 w-16 bg-muted flex-shrink-0">
              {item.product?.image && (
                <Image
                  src={item.product.image || "/placeholder.svg"}
                  alt={item.product.title}
                  fill
                  className="object-contain p-1"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=64&width=64"
                  }}
                />
              )}
            </div>

            <div className="flex-grow min-w-0">
              <h4 className="text-sm font-medium truncate">{item.product?.title}</h4>
              <p className="text-sm text-muted-foreground">${item.product?.price.toFixed(2)}</p>

              <div className="flex items-center mt-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6 rounded-full"
                  onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="mx-2 text-sm w-6 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6 rounded-full"
                  onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col justify-between items-end">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground hover:text-destructive"
                onClick={() => handleRemoveItem(item.productId)}
              >
                <X className="h-4 w-4" />
              </Button>
              <p className="text-sm font-medium">${((item.product?.price ?? 0) * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between mb-4">
          <span className="font-medium">{getTranslation(language, "subtotal")}</span>
          <span className="font-medium">${total.toFixed(2)}</span>
        </div>

        <div className="space-y-2">
          <Button className="w-full">{getTranslation(language, "checkout")}</Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={handleClearCart}>
              {getTranslation(language, "clearCart")}
            </Button>
            <Link href="/products" className="flex-1">
              <Button variant="outline" size="sm" className="w-full" onClick={onClose}>
                {getTranslation(language, "continueShopping")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

