"use client"

import type React from "react"

import { useEffect, useState, useCallback } from "react"
import { useProductStore } from "@/lib/store"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search, Plus, Filter } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { getTranslation } from "@/lib/translations"

export default function ProductsPage() {
  const { products, likedProducts, filter, setFilter, setProducts } = useProductStore()
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const { language } = useLanguage()

  // Handle URL parameters
  useEffect(() => {
    const filterParam = searchParams.get("filter")
    if (filterParam === "liked") {
      setFilter("liked")
    }

    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      setCategoryFilter(categoryParam)
    }
  }, [searchParams, setFilter])

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      if (products.length === 0) {
        try {
          setIsLoading(true)
          const response = await fetch("https://fakestoreapi.com/products")
          if (!response.ok) {
            throw new Error("Failed to fetch products")
          }
          const data = await response.json()
          setProducts(data)
        } catch (error) {
          console.error("Error fetching products:", error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [products.length, setProducts])

  const toggleShowFilters = useCallback(() => {
    setShowFilters((prev) => !prev)
  }, [])

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  const handleCategoryFilter = useCallback((category: string | null) => {
    setCategoryFilter(category)
  }, [])

  const handleFilterChange = useCallback(
    (newFilter: "all" | "liked") => {
      setFilter(newFilter)
    },
    [setFilter],
  )

  // Apply filters
  const filteredProducts = products
    .filter((product) => {
      if (filter === "liked") {
        return likedProducts.includes(product.id)
      }
      return true
    })
    .filter((product) => {
      if (categoryFilter) {
        return product.category.toLowerCase().includes(categoryFilter.toLowerCase())
      }
      return true
    })
    .filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )

  // Get unique categories
  const categories = [...new Set(products.map((product) => product.category))]

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-lg">Loading exquisite products...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif mb-4">{getTranslation(language, "ourCollection")}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">{getTranslation(language, "collectionDescription")}</p>
      </div>

      {/* Filters and Search */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={getTranslation(language, "searchProducts")}
              className="pl-10 rounded-full border-muted"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => handleFilterChange("all")}
              className="rounded-full"
              type="button"
            >
              {getTranslation(language, "allProducts")}
            </Button>
            <Button
              variant={filter === "liked" ? "default" : "outline"}
              onClick={() => handleFilterChange("liked")}
              className="rounded-full"
              type="button"
            >
              {getTranslation(language, "favorites")}
            </Button>
            <Button variant="outline" className="rounded-full" onClick={toggleShowFilters} type="button">
              <Filter className="h-4 w-4 mr-2" />
              {getTranslation(language, "filter")}
            </Button>
            <Link href="/create-product">
              <Button className="rounded-full">
                <Plus className="h-4 w-4 mr-2" />
                {getTranslation(language, "add")}
              </Button>
            </Link>
          </div>
        </div>

        {/* Category Filters */}
        {showFilters && (
          <div className="bg-secondary/50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-3">{getTranslation(language, "categories")}</h3>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={categoryFilter === null ? "default" : "outline"}
                size="sm"
                className="rounded-full text-xs"
                onClick={() => handleCategoryFilter(null)}
                type="button"
              >
                {getTranslation(language, "all")}
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={categoryFilter === category.toLowerCase() ? "default" : "outline"}
                  size="sm"
                  className="rounded-full text-xs"
                  onClick={() => handleCategoryFilter(category.toLowerCase())}
                  type="button"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground mb-6">{getTranslation(language, "noProducts")}</p>
          <Link href="/create-product">
            <Button className="rounded-full">
              <Plus className="h-4 w-4 mr-2" />
              {getTranslation(language, "addNewProduct")}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} isLiked={likedProducts.includes(product.id)} />
          ))}
        </div>
      )}
    </div>
  )
}

