"use client"

import { useEffect, useState, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { useProductStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart, Pencil, ShoppingBag, Plus, Minus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "@/hooks/use-toast"

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const productId = Number(params.id)

  const { getProduct, toggleLike, likedProducts, addToCart } = useProductStore()
  const [product, setProduct] = useState(() => getProduct(productId))
  const [isLoading, setIsLoading] = useState(!product)
  const [imageError, setImageError] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const isLiked = likedProducts.includes(productId)

  useEffect(() => {
    let isMounted = true

    const fetchProduct = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`)
        if (!response.ok) {
          throw new Error("Product not found")
        }
        const data = await response.json()
        if (isMounted) {
          setProduct(data)
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        router.push("/products")
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    if (!product) {
      fetchProduct()
    } else {
      setIsLoading(false)
    }

    return () => {
      isMounted = false
    }
  }, [productId, router, product])

  const handleToggleLike = useCallback(() => {
    toggleLike(productId)
  }, [productId, toggleLike])

  const handleBackClick = useCallback(() => {
    router.push("/products")
  }, [router])

  const handleImageError = () => {
    setImageError(true)
  }

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  const handleAddToCart = useCallback(() => {
    // Add to cart with a small delay to prevent React reconciliation issues
    setTimeout(() => {
      addToCart(productId, quantity)
      toast({
        title: "Added to cart",
        description: `${quantity} × ${product?.title} added to your cart`,
      })
    }, 0)
  }, [productId, quantity, product?.title, addToCart])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-lg">Loading product details...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-serif mb-4">Product not found</h1>
        <Button onClick={handleBackClick}>Return to Products</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={handleBackClick}
          className="hover:bg-transparent hover:text-primary"
          type="button"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Collection
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-white p-8 flex items-center justify-center">
          <div className="relative h-[500px] w-full">
            <Image
              src={
                imageError
                  ? "/placeholder.svg?height=500&width=500"
                  : product.image || "/placeholder.svg?height=500&width=500"
              }
              alt={product.title}
              fill
              className="object-contain"
              onError={handleImageError}
              priority
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-8">
          <div>
            <div className="mb-2">
              <span className="text-sm uppercase tracking-wider text-muted-foreground">{product.category}</span>
            </div>
            <h1 className="text-3xl font-serif mb-4">{product.title}</h1>
            <p className="text-2xl font-medium">${product.price?.toFixed(2)}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-serif">Description</h2>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Quantity Selector */}
          <div className="pt-6 border-t">
            <h3 className="text-sm font-medium mb-3">Quantity</h3>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-8 w-8"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                type="button"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-8 w-8"
                onClick={increaseQuantity}
                type="button"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="pt-6 border-t">
            <div className="flex gap-4">
              <Button className="flex-1 rounded-none py-6" size="lg" onClick={handleAddToCart} type="button">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-14 w-14"
                onClick={handleToggleLike}
                type="button"
              >
                <Heart className={`h-6 w-6 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
              <Link href={`/edit-product/${productId}`}>
                <Button variant="outline" size="icon" className="rounded-full h-14 w-14" type="button">
                  <Pencil className="h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t">
            <h2 className="text-xl font-serif">Details</h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Product ID</span>
                <span>{product.id}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span>{product.category}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

