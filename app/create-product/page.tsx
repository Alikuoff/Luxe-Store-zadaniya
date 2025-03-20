"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useProductStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"

export default function CreateProductPage() {
  const router = useRouter()
  const { addProduct } = useProductStore()

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg", // Default image
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({ ...prev, [name]: value }))

      // Clear error when field is edited
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[name]
          return newErrors
        })
      }
    },
    [errors],
  )

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title || formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters"
    }

    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number"
    }

    if (!formData.description || formData.description.length < 10) {
      newErrors.description = "Description must be at least 10 characters"
    }

    if (!formData.category || formData.category.length < 2) {
      newErrors.category = "Category is required"
    }

    if (formData.image && !formData.image.startsWith("http")) {
      newErrors.image = "Image must be a valid URL"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()

      if (validateForm()) {
        try {
          // Add product to store
          addProduct({
            title: formData.title,
            price: Number.parseFloat(formData.price),
            description: formData.description,
            category: formData.category,
            image: formData.image || "/placeholder.svg?height=400&width=400",
          })

          // Redirect to products page
          router.push("/products")
        } catch (error) {
          console.error("Error adding product:", error)
        }
      }
    },
    [addProduct, formData, router],
  )

  const handleBackClick = useCallback(() => {
    router.push("/products")
  }, [router])

  return (
    <div className="container mx-auto py-12 px-4 max-w-2xl">
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

      <div className="text-center mb-12">
        <h1 className="text-3xl font-serif mb-4">Add New Product</h1>
        <p className="text-muted-foreground">Create a new product to add to our exclusive collection.</p>
      </div>

      <div className="bg-white p-8 border shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Product Title *
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter product title"
              className="rounded-none"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-sm font-medium">
              Price *
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="29.99"
              className="rounded-none"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">
              Category *
            </Label>
            <Input
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Electronics, Jewelry, etc."
              className="rounded-none"
            />
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image" className="text-sm font-medium">
              Image URL *
            </Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="rounded-none"
            />
            {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description *
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed description of the product"
              rows={5}
              className="rounded-none"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          <Button type="submit" className="w-full rounded-none py-6">
            Add to Collection
          </Button>
        </form>
      </div>
    </div>
  )
}

