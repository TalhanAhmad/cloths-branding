# Shop System - Sample Products & Testing Guide

## 📋 Overview

The complete shop system has been built with:
- ✅ Collections display (Formal, Casual, Luxury + All)
- ✅ Product browsing with filters
- ✅ Shopping cart with Zustand state management
- ✅ Guest checkout with validation
- ✅ Backend order API with storage
- ✅ Tax calculation (17% Pakistan)
- ✅ Dynamic shipping costs

## 🚀 Quick Start

### Step 1: Seed Sample Products

Run the seeding script to populate your database with 12 sample products:

```bash
cd server
node seeds/sampleProducts.js
```

**Expected Output:**
```
Connected to MongoDB
✓ Successfully created 12 products

Products by category:
  • Formal Wear: 4 products
  • Casual Wear: 4 products
  • Luxury Collection: 4 products

✓ Sample products seeded successfully!
```

### Step 2: Start Required Services

#### Terminal 1 - Backend Server
```bash
cd server
npm start
```
(Should run on `http://localhost:5000`)

#### Terminal 2 - Frontend Development Server
```bash
cd client
npm start
```
(Should run on `http://localhost:3000`)

### Step 3: Test the Shop

1. **Navigate to Shop** → Click "Shop" in navbar
2. **Browse Collections** → Click collection cards at the top:
   - All Products
   - Formal Wear
   - Casual Wear
   - Luxury Collection
3. **View Product** → Click "Quick View" on any product
4. **Select Sizes & Colors** → Choose in the modal
5. **Add to Cart** → Click "Add to Cart" button
6. **View Cart** → Click cart icon in navbar
7. **Checkout** → Fill the guest checkout form:
   - Name
   - Email
   - Phone
   - Address
   - City
   - Postal Code
8. **Select Payment** → Choose:
   - Cash on Delivery
   - WhatsApp Order
   - Bank Transfer
9. **Place Order** → Click the payment button
10. **Success Screen** → Auto-redirects to home after 3 seconds

## 📊 Database Schema

### Product Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  category: String (Formal Wear | Casual Wear | Luxury Collection),
  sizes: [String],
  colors: [String],
  images: [String],
  isNew: Boolean,
  inStock: Boolean,
  rating: Number (0-5),
  reviewCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model
```javascript
{
  customerName: String (required),
  customerEmail: String,
  customerPhone: String (required),
  userId: ObjectId (optional - for authenticated users),
  
  products: [{
    productId: ObjectId,
    name: String,
    price: Number,
    quantity: Number,
    size: String,
    color: String
  }],
  
  subtotal: Number,
  tax: Number,
  shippingCost: Number,
  totalPrice: Number,
  
  shippingAddress: String (required),
  
  paymentMethod: String (WhatsApp | COD | Bank Transfer),
  paymentStatus: String (Pending | Paid | Failed),
  orderStatus: String (Pending | Confirmed | Shipped | Delivered | Cancelled),
  
  trackingNumber: String,
  estimatedDelivery: Date,
  
  adminNotes: String,
  customerNotes: String,
  
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### Products
- `GET /api/products` - Fetch all products
  ```
  Query params: category, search, minPrice, maxPrice
  ```

### Orders
- `POST /api/orders` - Create new order
  ```json
  {
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "03001234567",
    "products": [
      {
        "productId": "...",
        "name": "...",
        "price": 5000,
        "quantity": 2,
        "size": "M",
        "color": "Black"
      }
    ],
    "subtotal": 10000,
    "tax": 1700,
    "shippingCost": 0,
    "totalPrice": 11700,
    "shippingAddress": "123 Main St",
    "paymentMethod": "COD"
  }
  ```

- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/:id` - Get specific order
- `GET /api/orders/user/:userId` - Get user's orders
- `PUT /api/orders/:id` - Update order status
- `DELETE /api/orders/:id` - Cancel order

## 💳 Payment Methods

### 1. Cash on Delivery (COD)
- ✅ Ready to use
- No payment processing needed
- Admin confirms order manually

### 2. WhatsApp Order
- ✅ Ready to use
- Sends order details to WhatsApp number
- Message includes all product and shipping info
- **Configure WhatsApp number** in `.env`:
  ```
  WHATSAPP_NUMBER=your_number_here
  ```

### 3. Bank Transfer
- ⚠️ Needs configuration
- Add bank details to admin panel
- Send account info to customer via email

## 🧮 Pricing Logic

### Tax Calculation
```javascript
tax = subtotal * 0.17  // 17% (Pakistan standard)
```

### Shipping Cost
```javascript
if (subtotal > 5000) {
  shipping = 0  // Free shipping
} else {
  shipping = 300  // PKR 300
}
```

### Total Price
```javascript
total = subtotal + tax + shipping
```

## 🛒 Cart Store (Zustand)

Located: `client/src/store/cartStore.js`

**Available Hooks:**
```javascript
import { useCartStore } from '@/store/cartStore';

const cart = useCartStore((state) => state.cart);
const addToCart = useCartStore((state) => state.addToCart);
const removeFromCart = useCartStore((state) => state.removeFromCart);
const updateQuantity = useCartStore((state) => state.updateQuantity);
const clearCart = useCartStore((state) => state.clearCart);
```

## 📁 File Structure

```
server/
├── seeds/
│   └── sampleProducts.js      ← Run this to add sample products
├── models/
│   ├── Product.js             ← Product schema
│   └── Order.js               ← Order schema (guest checkout)
└── routes/
    └── orders.js              ← Order API endpoints

client/
├── src/
│   ├── pages/
│   │   ├── ProductsPage.jsx   ← Shop with collections
│   │   └── CartPage.jsx       ← Cart + checkout
│   ├── components/
│   │   └── ProductCard.jsx    ← Product card with quick view
│   ├── store/
│   │   └── cartStore.js       ← Zustand cart state
│   └── utils/
│       └── api.js             ← API client (orderAPI methods)
```

## ✅ Checklist for Testing

- [ ] Run `node seeds/sampleProducts.js` to add products
- [ ] Start backend server (`npm start` in server/)
- [ ] Start frontend (`npm start` in client/)
- [ ] Visit http://localhost:3000/shop
- [ ] Click on collection cards - products should filter
- [ ] Click "Quick View" on a product
- [ ] Select size and color
- [ ] Click "Add to Cart"
- [ ] Check cart count updates
- [ ] Navigate to cart page
- [ ] Fill checkout form with valid data:
  - Name: John Doe
  - Email: john@example.com
  - Phone: 03001234567
  - Address: 123 Main Street
  - City: Karachi
  - Postal Code: 75600
- [ ] Choose payment method (try COD first)
- [ ] Click "Place Order"
- [ ] See success screen
- [ ] Check MongoDB - order should be saved
- [ ] Verify tax calculation (17%)
- [ ] Verify shipping cost logic (free >5000, 300 otherwise)

## 🔧 Environment Variables

Create `.env` in server root:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/clothing-brand
JWT_SECRET=your_secret_key_here
WHATSAPP_NUMBER=+923001234567
NODE_ENV=development
```

## 🐛 Troubleshooting

### Products not showing
1. Have you run `node seeds/sampleProducts.js`?
2. Is MongoDB running?
3. Check browser console for API errors
4. Check terminal for backend errors

### Cart not persisting
- Check localStorage in browser DevTools → Application → Local Storage
- Should have `cart-storage` key with cart items

### Orders not being saved
1. Verify MongoDB connection in backend terminal
2. Check Order model is registered: `require('./models/Order')`
3. Check orders route is registered in server.js

### Checkout form not submitting
1. Ensure all required fields are filled (marked with *)
2. Check browser console for validation errors
3. Verify backend is running (http://localhost:5000 should respond)

## 📝 Next Steps

After verifying the shop works:

1. **Email Notifications** - Send order confirmations
2. **Admin Dashboard** - View and manage orders
3. **Order Tracking** - Customer tracking page
4. **Inventory Management** - Track stock levels
5. **Payment Gateway** - Integrate real payment processor
6. **Reviews & Ratings** - Customer feedback system

---

**Created:** Sample products with 12 items across 3 categories (Formal, Casual, Luxury)
**Ready for:** Testing, QA, and customer use
