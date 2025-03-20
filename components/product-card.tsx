"use client"

import type React from "react"

import type { Product } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Trash2, Eye, ShoppingBag } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useProductStore } from "@/lib/store"
import { useState, useCallback } from "react"
import { toast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
  isLiked: boolean
}

export function ProductCard({ product, isLiked }: ProductCardProps) {
  const router = useRouter()
  const { toggleLike, removeProduct, addToCart } = useProductStore()
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleCardClick = useCallback(
    (e: React.MouseEvent) => {
      // Prevent navigation if clicking on like or delete buttons
      if ((e.target as HTMLElement).closest("button")) {
        return
      }
      router.push(`/products/${product.id}`)
    },
    [product.id, router],
  )

  const handleToggleLike = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      toggleLike(product.id)
    },
    [product.id, toggleLike],
  )

  const handleRemoveProduct = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      removeProduct(product.id)
    },
    [product.id, removeProduct],
  )

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()

      // Add to cart with a small delay to prevent React reconciliation issues
      setTimeout(() => {
        addToCart(product.id, 1)
        toast({
          title: "Added to cart",
          description: `${product.title} added to your cart`,
        })
      }, 0)
    },
    [product.id, product.title, addToCart],
  )

  const handleImageError = () => {
    setImageError(true)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <Card
      className="group border-0 rounded-none overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="cursor-pointer flex flex-col h-full" onClick={handleCardClick}>
        {/* Image Container with Overlay */}
        <div className="relative h-72 w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300 z-10"></div>

          <Image
            src={
              imageError
                ? "/placeholder.svg?height=400&width=400"
                : product.image || "/placeholder.svg?height=400&width=400"
            }
            alt={product.title}
            fill
            className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105"
            onError={handleImageError}
            priority={false}
            loading="lazy"
          />

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full flex gap-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white hover:bg-primary hover:text-primary-foreground h-10 w-10"
                onClick={handleToggleLike}
                type="button"
              >
                <Heart className={`h-5 w-5 transition-colors ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white hover:bg-primary hover:text-primary-foreground h-10 w-10"
                onClick={(e) => {
                  e.stopPropagation()
                  router.push(`/products/${product.id}`)
                }}
                type="button"
              >
                <Eye className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white hover:bg-primary hover:text-primary-foreground h-10 w-10"
                onClick={handleAddToCart}
                type="button"
              >
                <ShoppingBag className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white hover:bg-destructive hover:text-destructive-foreground h-10 w-10"
                onClick={handleRemoveProduct}
                type="button"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="text-xs uppercase tracking-wider bg-white/80 backdrop-blur-sm px-3 py-1 shadow-sm">
              {product.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-6 flex-grow flex flex-col bg-white transition-all duration-300">
          <div className="space-y-2 mb-4">
            <h3 className="font-serif text-lg font-medium line-clamp-1 group-hover:text-primary transition-colors duration-300">
              {product.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 flex-grow">{product.description}</p>
          </div>

          <div className="pt-4 mt-auto border-t border-gray-100 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Price</span>
              <span className="font-medium text-lg">${product.price.toFixed(2)}</span>
            </div>

            <div
              className={`px-3 py-1 border border-primary text-primary text-xs uppercase tracking-wider transform transition-transform duration-300 ${isHovered ? "translate-x-0" : "translate-x-8 opacity-0"}`}
            >
              View Details
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

