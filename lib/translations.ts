// Update the Language type to include 'uz'
export type Language = "en" | "ru" | "uz"

export const translations = {
  en: {
    // Navigation
    home: "Home",
    shop: "Shop",
    addProduct: "Add Product",

    // Hero Section
    heroTitle: "Discover Luxury Redefined",
    heroDescription: "Explore our curated collection of premium products designed for the modern connoisseur.",
    shopCollection: "Shop Collection",

    // Categories
    featuredCategories: "Featured Categories",
    electronics: "Electronics",
    jewelry: "Jewelry",
    fashion: "Fashion",
    explore: "Explore",

    // Philosophy
    ourPhilosophy: "Our Philosophy",
    philosophyText1:
      "At LUXE, we believe in the perfect balance of form and function. Each product in our collection is carefully selected for its exceptional quality, timeless design, and unparalleled craftsmanship.",
    philosophyText2:
      "We partner with artisans and brands who share our commitment to excellence, sustainability, and ethical production practices.",
    discoverProducts: "Discover Our Products",

    // Newsletter
    joinCommunity: "Join Our Community",
    newsletterText:
      "Subscribe to our newsletter to receive updates on new arrivals, special offers, and exclusive events.",
    emailPlaceholder: "Your email address",
    subscribe: "Subscribe",

    // Products Page
    ourCollection: "Our Collection",
    collectionDescription:
      "Discover our curated selection of premium products, each chosen for its exceptional quality and timeless design.",
    searchProducts: "Search products...",
    allProducts: "All Products",
    favorites: "Favorites",
    filter: "Filter",
    add: "Add",
    categories: "Categories",
    all: "All",
    noProducts: "No products found",
    addNewProduct: "Add a new product",

    // Product Details
    backToCollection: "Back to Collection",
    description: "Description",
    quantity: "Quantity",
    addToCart: "Add to Cart",
    details: "Details",
    productID: "Product ID",
    category: "Category",

    // Cart
    yourCart: "Your Cart",
    items: "items",
    cartEmpty: "Your cart is empty",
    continueShopping: "Continue Shopping",
    subtotal: "Subtotal",
    checkout: "Checkout",
    clearCart: "Clear Cart",
    price: "Price",

    // Forms
    addNewProductTitle: "Add New Product",
    addNewProductDesc: "Create a new product to add to our exclusive collection.",
    editProduct: "Edit Product",
    editProductDesc: "Update the details of this product in our collection.",
    productTitle: "Product Title",
    productPrice: "Price",
    productCategory: "Category",
    productImageURL: "Image URL",
    productDescription: "Description",
    addToCollection: "Add to Collection",
    updateProduct: "Update Product",

    // Footer
    aboutUs: "About Us",
    contact: "Contact",
    careers: "Careers",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    cookiePolicy: "Cookie Policy",
    allRightsReserved: "All rights reserved.",

    // Validation
    required: "is required",
    minLength: "must be at least {0} characters",
    positiveNumber: "must be a positive number",
    validURL: "must be a valid URL",
  },
  ru: {
    // Navigation
    home: "Главная",
    shop: "Магазин",
    addProduct: "Добавить товар",

    // Hero Section
    heroTitle: "Откройте для себя роскошь",
    heroDescription: "Исследуйте нашу коллекцию премиальных товаров, созданных для современного ценителя.",
    shopCollection: "Смотреть коллекцию",

    // Categories
    featuredCategories: "Популярные категории",
    electronics: "Электроника",
    jewelry: "Ювелирные изделия",
    fashion: "Мода",
    explore: "Исследовать",

    // Philosophy
    ourPhilosophy: "Наша философия",
    philosophyText1:
      "В LUXE мы верим в идеальный баланс формы и функциональности. Каждый товар в нашей коллекции тщательно отобран за его исключительное качество, неподвластный времени дизайн и непревзойденное мастерство.",
    philosophyText2:
      "Мы сотрудничаем с мастерами и брендами, которые разделяют наше стремление к совершенству, устойчивому развитию и этичным производственным практикам.",
    discoverProducts: "Откройте наши товары",

    // Newsletter
    joinCommunity: "Присоединяйтесь к нашему сообществу",
    newsletterText:
      "Подпишитесь на нашу рассылку, чтобы получать обновления о новых поступлениях, специальных предложениях и эксклюзивных мероприятиях.",
    emailPlaceholder: "Ваш email адрес",
    subscribe: "Подписаться",

    // Products Page
    ourCollection: "Наша коллекция",
    collectionDescription:
      "Откройте для себя нашу подборку премиальных товаров, каждый из которых выбран за его исключительное качество и неподвластный времени дизайн.",
    searchProducts: "Поиск товаров...",
    allProducts: "Все товары",
    favorites: "Избранное",
    filter: "Фильтр",
    add: "Добавить",
    categories: "Категории",
    all: "Все",
    noProducts: "Товары не найдены",
    addNewProduct: "Добавить новый товар",

    // Product Details
    backToCollection: "Назад к коллекции",
    description: "Описание",
    quantity: "Количество",
    addToCart: "Добавить в корзину",
    details: "Детали",
    productID: "ID товара",
    category: "Категория",

    // Cart
    yourCart: "Ваша корзина",
    items: "товаров",
    cartEmpty: "Ваша корзина пуста",
    continueShopping: "Продолжить покупки",
    subtotal: "Итого",
    checkout: "Оформить заказ",
    clearCart: "Очистить корзину",
    price: "Цена",

    // Forms
    addNewProductTitle: "Добавить новый товар",
    addNewProductDesc: "Создайте новый товар для добавления в нашу эксклюзивную коллекцию.",
    editProduct: "Редактировать товар",
    editProductDesc: "Обновите детали этого товара в нашей коллекции.",
    productTitle: "Название товара",
    productPrice: "Цена",
    productCategory: "Категория",
    productImageURL: "URL изображения",
    productDescription: "Описание",
    addToCollection: "Добавить в коллекцию",
    updateProduct: "Обновить товар",

    // Footer
    aboutUs: "О нас",
    contact: "Контакты",
    careers: "Карьера",
    termsOfService: "Условия использования",
    privacyPolicy: "Политика конфиденциальности",
    cookiePolicy: "Политика использования файлов cookie",
    allRightsReserved: "Все права защищены.",

    // Validation
    required: "обязательно",
    minLength: "должно быть не менее {0} символов",
    positiveNumber: "должно быть положительным числом",
    validURL: "должен быть действительным URL",
  },
  uz: {
    // Navigation
    home: "Bosh sahifa",
    shop: "Do'kon",
    addProduct: "Mahsulot qo'shish",

    // Hero Section
    heroTitle: "Hashamatli mahsulotlarni kashf eting",
    heroDescription: "Zamonaviy mijozlar uchun yaratilgan premium mahsulotlar kolleksiyamizni ko'rib chiqing.",
    shopCollection: "Kolleksiyani ko'rish",

    // Categories
    featuredCategories: "Mashhur toifalar",
    electronics: "Elektronika",
    jewelry: "Zargarlik buyumlari",
    fashion: "Moda",
    explore: "Ko'rib chiqish",

    // Philosophy
    ourPhilosophy: "Bizning falsafamiz",
    philosophyText1:
      "LUXE'da biz shakl va funksionallikning mukammal muvozanatiga ishonamiz. Kolleksiyadagi har bir mahsulot o'zining ajoyib sifati, zamonaviy dizayni va tengsiz hunarmandligi uchun sinchkovlik bilan tanlanadi.",
    philosophyText2:
      "Biz mukammallikka, barqarorlikka va ishlab chiqarishning axloqiy amallariga intilishimizni baham ko'radigan ustalar va brendlar bilan hamkorlik qilamiz.",
    discoverProducts: "Bizning mahsulotlarni kashf eting",

    // Newsletter
    joinCommunity: "Bizning jamoaga qo'shiling",
    newsletterText:
      "Yangi kelgan mahsulotlar, maxsus takliflar va eksklyuziv tadbirlar haqidagi yangilanishlarni olish uchun bizning xabarnomalarga obuna bo'ling.",
    emailPlaceholder: "Sizning elektron pochta manzilingiz",
    subscribe: "Obuna bo'lish",

    // Products Page
    ourCollection: "Bizning kolleksiya",
    collectionDescription:
      "Ajoyib sifati va zamonaviy dizayni uchun tanlangan premium mahsulotlar tanlovimizni kashf eting.",
    searchProducts: "Mahsulotlarni qidirish...",
    allProducts: "Barcha mahsulotlar",
    favorites: "Sevimlilar",
    filter: "Filtrlash",
    add: "Qo'shish",
    categories: "Toifalar",
    all: "Hammasi",
    noProducts: "Mahsulotlar topilmadi",
    addNewProduct: "Yangi mahsulot qo'shish",

    // Product Details
    backToCollection: "Kolleksiyaga qaytish",
    description: "Tavsif",
    quantity: "Miqdori",
    addToCart: "Savatga qo'shish",
    details: "Tafsilotlar",
    productID: "Mahsulot ID raqami",
    category: "Toifa",

    // Cart
    yourCart: "Sizning savatchangiz",
    items: "mahsulotlar",
    cartEmpty: "Sizning savatchangiz bo'sh",
    continueShopping: "Xarid qilishni davom ettirish",
    subtotal: "Jami",
    checkout: "Buyurtma berish",
    clearCart: "Savatni tozalash",
    price: "Narx",

    // Forms
    addNewProductTitle: "Yangi mahsulot qo'shish",
    addNewProductDesc: "Bizning eksklyuziv kolleksiyamizga qo'shish uchun yangi mahsulot yarating.",
    editProduct: "Mahsulotni tahrirlash",
    editProductDesc: "Kolleksiyadagi ushbu mahsulot tafsilotlarini yangilang.",
    productTitle: "Mahsulot nomi",
    productPrice: "Narx",
    productCategory: "Toifa",
    productImageURL: "Rasm URL manzili",
    productDescription: "Tavsif",
    addToCollection: "Kolleksiyaga qo'shish",
    updateProduct: "Mahsulotni yangilash",

    // Footer
    aboutUs: "Biz haqimizda",
    contact: "Aloqa",
    careers: "Karyera",
    termsOfService: "Xizmat ko'rsatish shartlari",
    privacyPolicy: "Maxfiylik siyosati",
    cookiePolicy: "Cookie siyosati",
    allRightsReserved: "Barcha huquqlar himoyalangan.",

    // Validation
    required: "talab qilinadi",
    minLength: "kamida {0} ta belgidan iborat bo'lishi kerak",
    positiveNumber: "musbat son bo'lishi kerak",
    validURL: "haqiqiy URL bo'lishi kerak",
  },
}

export function getTranslation(lang: Language, key: keyof typeof translations.en): string {
  return translations[lang][key] || translations.en[key]
}

