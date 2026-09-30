# 🏗️ LORA Website Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT SIDE (Frontend)                    │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  React 18 (http://localhost:3000)                         │   │
│  │                                                            │   │
│  │  Pages:                                                   │   │
│  │  ├─ HomePage (Hero, Categories, Products)              │   │
│  │  ├─ ProductsPage (Catalog + Filters)                   │   │
│  │  ├─ CartPage (Shopping Cart, WhatsApp Checkout)        │   │
│  │  ├─ LoginPage (Auth)                                   │   │
│  │  └─ AdminPanel (Product Management)                    │   │
│  │                                                            │   │
│  │  Components:                                              │   │
│  │  ├─ Header (Navigation)                                │   │
│  │  ├─ Footer (Contact Info)                              │   │
│  │  └─ ProductCard (Quick View, Add to Cart)              │   │
│  │                                                            │   │
│  │  State: Zustand (cartStore)                             │   │
│  │                                                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                           │                                       │
│                           │ Axios API Calls                       │
│                           ▼                                       │
└─────────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP/REST
                            │
┌─────────────────────────────────────────────────────────────────┐
│                       SERVER SIDE (Backend)                      │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Node.js + Express (http://localhost:5000)              │   │
│  │                                                            │   │
│  │  API Routes:                                             │   │
│  │  ├─ /api/products (GET, POST, PUT, DELETE)             │   │
│  │  ├─ /api/users (Register, Login)                       │   │
│  │  ├─ /api/orders (Create, Get, Update Status)           │   │
│  │  └─ /api/reviews (Create, Get)                         │   │
│  │                                                            │   │
│  │  Middleware:                                             │   │
│  │  ├─ CORS                                                │   │
│  │  ├─ JSON Parser                                         │   │
│  │  └─ Error Handler                                       │   │
│  │                                                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                           │                                       │
│                           │ Mongoose Queries                      │
│                           ▼                                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  MongoDB Collections:                                    │   │
│  │  ├─ Products (name, price, images, ratings)            │   │
│  │  ├─ Users (email, password, profile)                   │   │
│  │  ├─ Orders (products, total, status)                   │   │
│  │  └─ Reviews (rating, comment, verified)                │   │
│  │                                                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
User browses Website
         │
         ├──→ ViewProducts ──→ API /api/products ──→ DB fetch → Display
         │
         ├──→ Add to Cart ──→ Zustand State (Frontend)
         │
         ├──→ Checkout ──→ WhatsApp (No payment gateway needed)
         │
         ├──→ Login/Register ──→ API /api/users ──→ JWT Token
         │
         └──→ Leave Review ──→ API /api/reviews ──→ Update Rating

Admin Updates Products
         │
         ├──→ Add Product ──→ API POST /api/products ──→ DB Save
         │
         ├──→ Edit Product ──→ API PUT /api/products/:id ──→ DB Update
         │
         ├──→ Delete Product ──→ API DELETE /api/products/:id ──→ DB Delete
         │
         └──→ View Orders ──→ API /api/orders ──→ Update Status
```

## Component Hierarchy

```
App
├── Header
│   ├── Logo
│   ├── Navigation Menu
│   ├── Search Icon
│   ├── Wishlist Icon
│   └── Cart Icon (shows count)
│
├── Main Routes
│   ├── HomePage
│   │   ├── HeroSection
│   │   ├── CategoriesSection
│   │   ├── NewArrivalsSection
│   │   │   └── ProductCard (multiple)
│   │   ├── TrustBadgesSection
│   │   ├── FeaturedProductsSection
│   │   │   └── ProductCard (multiple)
│   │   ├── InstagramGallerySection
│   │   └── CTASection
│   │
│   ├── ProductsPage
│   │   ├── FiltersPanel
│   │   │   ├── SearchBox
│   │   │   ├── CategoryFilter
│   │   │   └── PriceRangeFilter
│   │   └── ProductsGrid
│   │       └── ProductCard (multiple)
│   │
│   ├── CartPage
│   │   ├── CartItems
│   │   │   └── CartItemRow (multiple)
│   │   └── OrderSummary
│   │       ├── SubtotalDisplay
│   │       ├── ShippingAddress
│   │       └── CheckoutButton (WhatsApp)
│   │
│   ├── LoginPage
│   │   ├── LoginForm
│   │   ├── RegisterForm
│   │   └── ToggleSwitch
│   │
│   └── AdminPanel
│       ├── TabNavigation
│       ├── ProductForm (Add/Edit)
│       ├── ProductsTable
│       └── OrdersTable
│
└── Footer
    ├── BrandInfo
    ├── QuickLinks
    ├── ContactInfo
    ├── SocialLinks
    └── BottomBar
```

## State Management (Zustand)

```
cartStore
├── State:
│   ├── cart: [
│   │   {
│   │     _id: productId,
│   │     name, price, images,
│   │     quantity
│   │   }
│   │ ]
│   └── user: {
│       id, name, email, isAdmin
│     }
│
└── Actions:
    ├── addToCart(product)
    ├── removeFromCart(productId)
    ├── updateQuantity(productId, qty)
    ├── clearCart()
    └── setUser(user)
```

## Database Schema

```
┌─────────────────────────────────────────┐
│          PRODUCTS Collection            │
├─────────────────────────────────────────┤
│ _id: ObjectId                           │
│ name: String                            │
│ description: String                     │
│ price: Number                           │
│ originalPrice: Number                   │
│ category: Enum (Formal|Casual|Luxury)  │
│ sizes: [String]                         │
│ colors: [String]                        │
│ images: [String/URL]                    │
│ inStock: Boolean                        │
│ isNew: Boolean                          │
│ rating: Number                          │
│ reviewCount: Number                     │
│ createdAt: Date                         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│          USERS Collection               │
├─────────────────────────────────────────┤
│ _id: ObjectId                           │
│ name: String                            │
│ email: String (unique)                  │
│ phone: String                           │
│ password: String (hashed)               │
│ address: String                         │
│ city: String                            │
│ isAdmin: Boolean                        │
│ createdAt: Date                         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│          ORDERS Collection              │
├─────────────────────────────────────────┤
│ _id: ObjectId                           │
│ userId: ObjectId (ref: User)            │
│ products: [{                            │
│   productId, name, price,               │
│   quantity, size, color                 │
│ }]                                      │
│ totalPrice: Number                      │
│ orderStatus: Enum                       │
│   (Pending|Confirmed|Shipped|Delivered)│
│ paymentMethod: Enum                     │
│   (WhatsApp|Bank|COD)                   │
│ shippingAddress: String                 │
│ createdAt: Date                         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│          REVIEWS Collection             │
├─────────────────────────────────────────┤
│ _id: ObjectId                           │
│ productId: ObjectId (ref: Product)      │
│ userId: ObjectId (ref: User)            │
│ userName: String                        │
│ rating: Number (1-5)                    │
│ comment: String                         │
│ images: [String/URL]                    │
│ verified: Boolean                       │
│ createdAt: Date                         │
└─────────────────────────────────────────┘
```

## API Endpoint Map

```
Authentication Routes:
├── POST   /api/users/register    → Create user account
├── POST   /api/users/login       → Generate JWT token
└── GET    /api/users/:id         → Get user profile

Product Routes:
├── GET    /api/products          → Fetch all (with filters)
├── GET    /api/products/:id      → Fetch single product
├── POST   /api/products          → Create (admin only)
├── PUT    /api/products/:id      → Update (admin only)
└── DELETE /api/products/:id      → Delete (admin only)

Order Routes:
├── POST   /api/orders            → Create order
├── GET    /api/orders/user/:id   → Get user's orders
├── GET    /api/orders            → Get all (admin only)
└── PUT    /api/orders/:id        → Update status (admin only)

Review Routes:
├── POST   /api/reviews           → Create review
└── GET    /api/reviews/product/:id → Get product reviews
```

## Deployment Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Internet / Users                      │
└──────────────────────────────────────────────────────────┘
                 │                            │
          Frontend Requests          API Requests
                 │                            │
        ┌────────▼──────────┐        ┌────────▼──────────┐
        │   Vercel/Netlify  │        │  Heroku/Railway   │
        │  (Frontend Host)  │        │ (Backend Host)    │
        │                  │        │                   │
        │  React App (JS)   │        │ Node.js Server    │
        │  Tailwind CSS     │        │ Express API       │
        └────────┬──────────┘        └────────┬──────────┘
                 │                            │
                 │                  Database Connection
                 │                            │
                 │              ┌──────────────▼───────────┐
                 │              │  MongoDB Atlas (Cloud)   │
                 │              │  or Local MongoDB        │
                 │              └──────────────────────────┘
                 │
        With WhatsApp Button Integration
```

## Security Flow

```
User Registration/Login:
    ↓
Input Validation
    ↓
Check if User Exists
    ↓
Hash Password (bcryptjs)
    ↓
Save to Database
    ↓
Generate JWT Token
    ↓
Send Token to Client
    ↓
Client stores token in localStorage

Protected Routes:
    ↓
Client sends token in header
    ↓
Server verifies JWT signature
    ↓
Token valid? → Allow access
    ↓
Token invalid/expired? → Redirect to login
```

## User Journey Map

```
New Visitor
    ├── Views Homepage
    ├── Browses Categories
    ├── Searches/Filters Products
    ├── Views Product Details (Quick View)
    ├── Adds to Cart
    │
    ├── [Option 1: WhatsApp Order]
    │   └── Clicks "Order on WhatsApp"
    │       └── Auto-sends order via WhatsApp
    │
    └── [Option 2: Create Account]
        ├── Goes to LoginPage
        ├── Registers account
        ├── Confirms email
        ├── Completes checkout
        └── Receives order confirmation

Admin Journey:
    ├── Goes to /admin
    ├── Logs in
    ├── Adds new products with images
    ├── Updates prices
    ├── Tracks orders
    └── Manages order statuses
```

---

## Summary

✅ **Frontend**: React components render UI
✅ **Backend**: Express serves API endpoints
✅ **Database**: MongoDB stores all data
✅ **Authentication**: JWT tokens for security
✅ **Integration**: WhatsApp for orders
✅ **State**: Zustand for cart management
✅ **Styling**: Tailwind CSS for design

All working together to create a seamless e-commerce experience! 🎉
