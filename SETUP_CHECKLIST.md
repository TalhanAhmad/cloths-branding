# 🛍️ Shop System - Complete Setup Checklist

## Phase 1: Database Setup ✅

- [ ] **MongoDB is running locally**
  ```bash
  # On Windows, if installed with MongoDB Community:
  # MongoDB should start as a service
  # Verify: http://localhost:27017 (should show connection refused, which is normal)
  ```

- [ ] **Environment variables configured** (`.env` file in `server/`)
  ```env
  PORT=5000
  MONGODB_URI=mongodb://localhost:27017/clothing-brand
  JWT_SECRET=your-secret-key-here
  WHATSAPP_NUMBER=+923001234567
  NODE_ENV=development
  ```

- [ ] **Sample products seeded**
  ```bash
  cd server
  node seeds/sampleProducts.js
  ```
  ✅ Expected: "✓ Successfully created 12 products"

---

## Phase 2: Backend Services ✅

- [ ] **Install Dependencies**
  ```bash
  cd server
  npm install
  ```

- [ ] **Start Backend Server**
  ```bash
  npm start
  ```
  ✅ Expected: Terminal shows "Server running on port 5000"

- [ ] **Test Backend APIs** (in new terminal, from `server/` folder)
  ```bash
  node apiTest.js
  ```
  ✅ Expected: All 7 tests pass with green checkmarks

---

## Phase 3: Frontend Services ✅

- [ ] **Install Dependencies**
  ```bash
  cd client
  npm install
  ```

- [ ] **Start Frontend Server**
  ```bash
  npm start
  ```
  ✅ Expected: Browser opens to http://localhost:3000

- [ ] **Frontend compiles without errors**
  - Check browser console: No red errors
  - All pages load: Home, Shop, Account

---

## Phase 4: Shop Functionality Testing 🛒

### Collections Display
- [ ] Navigate to `/shop` page
- [ ] See 4 collection cards at the top:
  - All Products
  - Formal Wear
  - Casual Wear  
  - Luxury Collection
- [ ] Collection cards have hover effects
- [ ] Clicking collection filters products

### Product Browsing
- [ ] Products display in grid (3 columns on desktop)
- [ ] Each product shows:
  - Product image
  - Product name
  - Original price (strikethrough)
  - Sale price (highlighted)
  - Rating (stars)
  - Wishlist icon
- [ ] Search bar filters by product name
- [ ] Price filter works (min-max range)

### Product Quick View
- [ ] Click "Quick View" on any product
- [ ] Modal opens showing:
  - Larger product image
  - Full description
  - Size selection buttons
  - Color selection buttons
  - Price and availability
- [ ] Can select size: XS, S, M, L, XL, etc.
- [ ] Can select color options
- [ ] "Add to Cart" button available

### Add to Cart
- [ ] Click product size and color
- [ ] Click "Add to Cart"
- [ ] See green check "Added!" message
- [ ] Cart count increases (top navbar)
- [ ] Product added to localStorage

### Cart Page
- [ ] Navigate to cart (click cart icon in navbar)
- [ ] See cart items list:
  - Product name, image, price
  - Quantity controls (+/-)
  - Remove button
- [ ] Can modify quantities
- [ ] Can remove items
- [ ] "Continue Shopping" link works

### Checkout Form
- [ ] On cart page, see checkout form on right side
- [ ] Form has fields:
  - Name (required)
  - Email (required)
  - Phone (required)
  - Address (required)
  - City (required)
  - Postal Code (required)
- [ ] Form validates (error on submit if empty)

### Order Summary
- [ ] See order summary sidebar showing:
  - Subtotal
  - Tax (17% calculation)
  - Shipping cost (0 if >5000, 300 otherwise)
  - Total (all summed)
- [ ] Calculations are accurate

### Payment Method Selection
- [ ] See 3 payment buttons:
  - "Cash on Delivery"
  - "Order via WhatsApp"
  - "Bank Transfer"
- [ ] Each button is clickable

### Placing an Order

#### Test 1: Cash on Delivery
- [ ] Fill checkout form with valid data:
  - Name: Test User
  - Email: test@example.com
  - Phone: 03001234567
  - Address: 123 Main St
  - City: Karachi
  - Postal Code: 75600
- [ ] Click "Cash on Delivery" button
- [ ] Loading spinner appears
- [ ] Order success screen shows:
  - Confirmation message
  - Order details
  - "Continue Shopping" button
- [ ] 3-second countdown and auto-redirect to home

#### Test 2: WhatsApp Order
- [ ] Fill same checkout form
- [ ] Click "Order via WhatsApp"
- [ ] New window opens WhatsApp with:
  - Pre-filled message containing order details
  - Product names, quantities, prices
  - Shipping address
  - Total amount
- [ ] Success screen still appears

#### Test 3: Form Validation
- [ ] Try submitting empty form
- [ ] See validation error messages
- [ ] Try with incomplete data (missing phone)
- [ ] See specific field error
- [ ] Cannot submit with missing required fields

---

## Phase 5: Database Verification 🗄️

- [ ] **Check MongoDB Collections**
  ```bash
  # Connect to MongoDB (using MongoDB Compass or mongosh)
  # Look for database: clothing-brand
  # Collections should exist:
  # - products (12 items)
  # - orders (your test orders)
  ```

- [ ] **Verify Product Data**
  - Products have all fields: name, description, price, sizes, colors, images
  - Products are tagged with correct categories
  - All 12 sample products exist

- [ ] **Verify Order Data**
  - Each order has: customerName, customerPhone, products array, totalPrice
  - Tax calculated correctly (17%)
  - Shipping cost calculated correctly
  - Timestamps present (createdAt, updatedAt)

---

## Phase 6: Error Handling Testing 🐛

- [ ] **Missing Backend**
  - Stop backend server
  - Try to add item to cart
  - See error message in console
  - Restart backend and retry ✓

- [ ] **Network Error**
  - Open DevTools Network tab
  - Try to place order with backend stopped
  - See failed request in Network tab
  - See error message on UI

- [ ] **Validation Errors**
  - Try placing order with:
    - Phone number too short
    - Empty name field
    - Invalid email format
  - Appropriate error messages appear

---

## Phase 7: Performance Checks ⚡

- [ ] **Page Load Time**
  - Open DevTools → Network tab
  - Reload shop page
  - HTML loads in < 1s
  - API responds in < 500ms

- [ ] **Cart Performance**
  - Add 10 items to cart
  - Remove 5 items
  - No lag or delays observed

- [ ] **No Console Errors**
  - Open DevTools → Console tab
  - No red error messages
  - No warnings blocking functionality

---

## Phase 8: Browser Compatibility ✅

Tested on:
- [ ] Chrome/Edge (Windows)
- [ ] Firefox (Windows)
- [ ] Safari (Mac) - if available
- [ ] Mobile browser responsive test
  - Shop page responsive on phone
  - Product cards stack properly
  - Checkout form fields readable

---

## Phase 9: Data Persistence ✅

- [ ] **Cart persists after page reload**
  - Add items to cart
  - Reload page
  - Items still in cart

- [ ] **Orders saved to database**
  - Place order
  - Check MongoDB
  - Order data exists with all fields
  - Timestamps are accurate

- [ ] **No duplicate orders**
  - Submit same order once
  - Only one order created
  - (Not created multiple times)

---

## Phase 10: Quick Reference - Common Commands

### Start Everything
```bash
# Terminal 1 - Backend
cd server && npm start

# Terminal 2 - Frontend  
cd client && npm start

# Terminal 3 - Testing (optional)
cd server && node apiTest.js
```

### Seed Products
```bash
node server/seeds/sampleProducts.js
```

### Check MongoDB
```bash
# Using MongoDB Compass:
# Connect to: mongodb://localhost:27017
# Database: clothing-brand
```

### Reset Database
```bash
# Delete all collections (WARNING: Data loss)
# Using MongoDB Compass, right-click database → Drop Database
```

### View API Documentation
```
Backend: http://localhost:5000/api/products
Frontend: http://localhost:3000/shop
```

---

## ✅ Final Verification Checklist

Before going to production:

- [ ] All 12 sample products display in shop
- [ ] Collections filter products correctly
- [ ] Cart stores items in localStorage
- [ ] Guest checkout form validates
- [ ] Orders save to MongoDB with correct data
- [ ] Tax calculates at 17%
- [ ] Shipping logic works (free >5000):
  - [ ] Test order with subtotal 4000 → shipping 300
  - [ ] Test order with subtotal 6000 → shipping 0
- [ ] Payment method buttons functional
- [ ] Success screen shows and auto-redirects
- [ ] No console errors on any page
- [ ] Responsive design works on mobile

---

## 🚨 Troubleshooting

### Issue: "Cannot GET /api/products"
**Solution:**
- [ ] Is backend running? (Check terminal shows "port 5000")
- [ ] Is MongoDB running?
- [ ] Check `.env` file exists with MONGODB_URI

### Issue: Cart shows 0 items after refresh
**Solution:**
- [ ] Check localStorage in DevTools
- [ ] Look for `cart-storage` key
- [ ] Check browser allows localStorage (not in private mode)

### Issue: "Cannot POST /api/orders"
**Solution:**
- [ ] Is backend running?
- [ ] Are all fields in form filled?
- [ ] Check browser Network tab for 400/500 errors
- [ ] Check backend terminal for error logs

### Issue: "Connection refused" error
**Solution:**
- [ ] MongoDB not running: Start MongoDB service
- [ ] Backend not running: `npm start` in server/
- [ ] Using wrong port: Check `.env` PORT setting

### Issue: Products don't show in shop
**Solution:**
- [ ] Haven't seeded products? Run: `node server/seeds/sampleProducts.js`
- [ ] Products exist but API not called: Check Network tab
- [ ] Check browser console for errors

---

## 📞 Support Workflow

1. **Check Checklist** - Which phase failed?
2. **Check Troubleshooting** - Does your issue match?
3. **Check Terminal Logs:**
   - Frontend errors in console
   - Backend errors in terminal
   - MongoDB connection status
4. **Check DevTools:**
   - Network tab - Are requests failing?
   - Console tab - JavaScript errors?
   - Application tab - localStorage data?

---

**Status:** Ready for QA Testing ✅
**Last Updated:** Phase 2 (Backend + Seeding Complete)
**Next Step:** Run all tests and verify functionality

