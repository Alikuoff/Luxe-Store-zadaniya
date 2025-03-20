import { useStore } from "zustand"
import { createStore } from "zustand/vanilla"

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  liked?: boolean
}

export interface CartItem {
  productId: number
  quantity: number
}

interface ProductStore {
  products: Product[]
  likedProducts: number[]
  cartItems: CartItem[]
  filter: "all" | "liked"
  setProducts: (products: Product[]) => void
  addProduct: (product: Omit<Product, "id">) => void
  removeProduct: (id: number) => void
  toggleLike: (id: number) => void
  setFilter: (filter: "all" | "liked") => void
  getProduct: (id: number) => Product | undefined
  updateProduct: (id: number, product: Partial<Product>) => void
  // Cart functions
  addToCart: (productId: number, quantity?: number) => void
  removeFromCart: (productId: number) => void
  updateCartItemQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getCartItemCount: () => number
  getCartTotal: () => number
}

// Ensure we only create a single store instance
let storeInstance: ReturnType<typeof createProductStore> | null = null

// Create a store without persistence
const createProductStore = () => {
  return createStore<ProductStore>((set, get) => ({
    products: [],
    likedProducts: [],
    cartItems: [],
    filter: "all",
    setProducts: (products) => {
      // Only update if products are different
      const currentProducts = get().products
      if (currentProducts.length === 0 && products.length > 0) {
        set({ products })
      }
    },
    addProduct: (product) =>
      set((state) => ({
        products: [...state.products, { ...product, id: Date.now() }],
      })),
    removeProduct: (id) =>
      set((state) => ({
        products: state.products.filter((product) => product.id !== id),
        likedProducts: state.likedProducts.filter((productId) => productId !== id),
        cartItems: state.cartItems.filter((item) => item.productId !== id),
      })),
    toggleLike: (id) =>
      set((state) => {
        const isLiked = state.likedProducts.includes(id)
        return {
          likedProducts: isLiked
            ? state.likedProducts.filter((productId) => productId !== id)
            : [...state.likedProducts, id],
        }
      }),
    setFilter: (filter) => {
      // Only update if filter is different
      if (get().filter !== filter) {
        set({ filter })
      }
    },
    getProduct: (id) => get().products.find((product) => product.id === id),
    updateProduct: (id, updatedProduct) =>
      set((state) => ({
        products: state.products.map((product) => (product.id === id ? { ...product, ...updatedProduct } : product)),
      })),
    // Cart functions
    addToCart: (productId, quantity = 1) =>
      set((state) => {
        const existingItem = state.cartItems.find((item) => item.productId === productId)

        if (existingItem) {
          // Update quantity if item already exists
          return {
            cartItems: state.cartItems.map((item) =>
              item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item,
            ),
          }
        } else {
          // Add new item
          return {
            cartItems: [...state.cartItems, { productId, quantity }],
          }
        }
      }),
    removeFromCart: (productId) =>
      set((state) => ({
        cartItems: state.cartItems.filter((item) => item.productId !== productId),
      })),
    updateCartItemQuantity: (productId, quantity) =>
      set((state) => ({
        cartItems: state.cartItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(1, quantity) } // Ensure quantity is at least 1
            : item,
        ),
      })),
    clearCart: () => set({ cartItems: [] }),
    getCartItemCount: () => {
      // This implementation is more efficient and won't cause unnecessary re-renders
      const { cartItems } = get()
      return cartItems.reduce((total, item) => total + item.quantity, 0)
    },
    getCartTotal: () => {
      const { products, cartItems } = get()
      return cartItems.reduce((total, item) => {
        const product = products.find((p) => p.id === item.productId)
        return total + (product ? product.price * item.quantity : 0)
      }, 0)
    },
  }))
}

// Create or get the store instance
const getProductStore = () => {
  if (!storeInstance) {
    storeInstance = createProductStore()

    // Initialize from localStorage only once
    if (typeof window !== "undefined") {
      try {
        const savedState = localStorage.getItem("product-storage")
        if (savedState) {
          try {
            const { products, likedProducts, cartItems } = JSON.parse(savedState)
            storeInstance.setState({
              products: products || [],
              likedProducts: likedProducts || [],
              cartItems: cartItems || [],
            })
          } catch (e) {
            console.error("Failed to parse stored state:", e)
          }
        }

        // Subscribe to changes and save to localStorage
        storeInstance.subscribe((state) => {
          try {
            const { products, likedProducts, cartItems } = state
            localStorage.setItem("product-storage", JSON.stringify({ products, likedProducts, cartItems }))
          } catch (e) {
            console.error("Failed to save state to localStorage:", e)
          }
        })
      } catch (e) {
        console.error("Error accessing localStorage:", e)
      }
    }
  }
  return storeInstance
}

// Get the singleton store instance
const productStore = getProductStore()

// Hook to use the store in components
export const useProductStore = () => {
  const store = useStore(productStore)
  return store
}

// Add subscribe method to the store for components to use
useProductStore.subscribe = productStore.subscribe

