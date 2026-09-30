# Project Folder Structure Guide

## Overview
This project is organized with clear separation between **User** (customer) features and **Owner** (admin) features, making it easier to maintain, scale, and manage permissions.

---

## Frontend Structure (client/src)

```
src/
├── user/                          # User-facing features
│   ├── pages/
│   │   ├── HomePage.jsx           # Landing page with collections
│   │   ├── ProductsPage.jsx       # Shop/Browse products
│   │   ├── CartPage.jsx           # Shopping cart & checkout
│   │   ├── AboutPage.jsx          # About company
│   │   └── ContactPage.jsx        # Contact & support
│   │
│   └── components/
│       └── ProductCard.jsx        # Product display card
│
├── owner/                         # Owner/Admin features
│   ├── pages/
│   │   ├── AdminPanel.jsx         # Main admin dashboard
│   │   ├── ProductManagement.jsx  # Add/Edit/Delete products
│   │   ├── OrderManagement.jsx    # Manage customer orders
│   │   ├── Analytics.jsx          # Sales & revenue stats
│   │   └── UserManagement.jsx     # Manage user accounts
│   │
│   └── components/
│       ├── AdminNavBar.jsx        # Admin-only navigation
│       ├── ProductForm.jsx        # Product creation/edit form
│       ├── OrderStatusPanel.jsx   # Order status updater
│       └── AnalyticsChart.jsx     # Sales charts & graphs
│
├── common/                        # Shared resources
│   ├── components/
│   │   ├── Header.jsx             # Top navigation (all users)
│   │   └── Footer.jsx             # Footer (all users)
│   │
│   ├── utils/
│   │   └── api.js                 # API calls with Axios
│   │
│   └── store/
│       └── cartStore.js           # Zustand cart management
│
├── pages/
│   └── LoginPage.jsx              # Shared login (route to user/admin)
│
├── App.jsx                        # Main routing logic
├── index.js                       # React entry point
└── index.css                      # Global styles
```

---

## Backend Structure (server)

```
server/
├── routes/
│   ├── user/                      # User routes
│   │   ├── products.js            # GET product listing & details
│   │   └── reviews.js             # POST/GET product reviews
│   │
│   ├── owner/                     # Owner/Admin routes
│   │   ├── products.js            # POST/PUT/DELETE products (admin only)
│   │   ├── orders.js              # GET all orders, PUT update status
│   │   ├── users.js               # GET user list, manage accounts
│   │   └── analytics.js           # GET sales stats & analytics
│   │
│   └── shared/
│       └── auth.js                # Register, Login (shared)
│
├── controllers/
│   ├── user/                      # User operation logic
│   │   ├── productController.js   # Get products, filter, search
│   │   └── reviewController.js    # Create & fetch reviews
│   │
│   ├── owner/                     # Admin operation logic
│   │   ├── productController.js   # CRUD operations on products
│   │   ├── orderController.js     # Manage order statuses
│   │   ├── userController.js      # User account management
│   │   └── analyticsController.js # Generate reports & stats
│   │
│   └── shared/
│       └── authController.js      # Registration & login logic
│
├── models/                        # Database schemas
│   ├── Product.js                 # Product schema
│   ├── User.js                    # User schema (with isAdmin flag)
│   ├── Order.js                   # Order schema
│   └── Review.js                  # Product review schema
│
├── middleware/
│   ├── authMiddleware.js          # JWT verification
│   ├── adminMiddleware.js         # Admin-only access check
│   └── errorHandler.js            # Global error handling
│
├── config/
│   ├── db.js                      # MongoDB connection
│   └── constants.js               # App-wide constants
│
├── server.js                      # Main server entry point
├── package.json                   # Dependencies
└── .env                          # Environment variables
```

---

## File Organization Logic

### Frontend Routing Strategy

```javascript
// App.jsx example with role-based routing
const App = () => {
  const user = getUser(); // From Zustand or API

  return (
    <Routes>
      {/* USER ROUTES */}
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ProductsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />

      {/* ADMIN ROUTES (Protected) */}
      <Route
        path="/admin/*"
        element={user?.isAdmin ? <AdminLayout /> : <Navigate to="/login" />}
      >
        <Route path="dashboard" element={<AdminPanel />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="orders" element={<OrderManagement />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="users" element={<UserManagement />} />
      </Route>

      {/* AUTH ROUTES */}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
```

### Backend Route Organization Example

```javascript
// server.js - main setup
const express = require('express');
const app = express();

// Shared routes (Auth)
app.use('/api/auth', require('./routes/shared/auth'));

// User routes
app.use('/api/products', require('./routes/user/products'));
app.use('/api/reviews', require('./routes/user/reviews'));

// Admin routes (with adminMiddleware)
const adminMiddleware = require('./middleware/adminMiddleware');
app.use('/api/admin/products', adminMiddleware, require('./routes/owner/products'));
app.use('/api/admin/orders', adminMiddleware, require('./routes/owner/orders'));
app.use('/api/admin/users', adminMiddleware, require('./routes/owner/users'));
app.use('/api/admin/analytics', adminMiddleware, require('./routes/owner/analytics'));
```

---

## Key Features by Section

### User Section
✓ Browse products
✓ View product details & reviews
✓ Add to cart
✓ Checkout via WhatsApp
✓ Leave reviews
✓ View order history
✓ Account profile

### Owner Section
✓ Add/Edit/Delete products
✓ Manage inventory
✓ View all customer orders
✓ Update order status
✓ View sales analytics
✓ Manage user accounts
✓ Generate revenue reports

### Common Section
✓ Header navigation
✓ Footer with contact info
✓ API communication
✓ Cart state management
✓ Global styling

---

## Migration Guide (From Old Structure)

### Step 1: Move Frontend Files

```
OLD                              NEW
src/pages/HomePage.jsx      →    src/user/pages/HomePage.jsx
src/pages/ProductsPage.jsx  →    src/user/pages/ProductsPage.jsx
src/pages/CartPage.jsx      →    src/user/pages/CartPage.jsx
src/pages/AboutPage.jsx     →    src/user/pages/AboutPage.jsx
src/pages/ContactPage.jsx   →    src/user/pages/ContactPage.jsx
src/pages/AdminPanel.jsx    →    src/owner/pages/AdminPanel.jsx
src/pages/LoginPage.jsx     →    src/pages/LoginPage.jsx

src/components/ProductCard.jsx      →    src/user/components/ProductCard.jsx
src/components/Header.jsx           →    src/common/components/Header.jsx
src/components/Footer.jsx           →    src/common/components/Footer.jsx

src/utils/api.js            →    src/common/utils/api.js
src/store/cartStore.js      →    src/common/store/cartStore.js
```

### Step 2: Move Backend Files

```
OLD                                 NEW
routes/products.js (GET)       →    routes/user/products.js
routes/products.js (POST/PUT)  →    routes/owner/products.js
routes/orders.js               →    routes/owner/orders.js
routes/users.js                →    routes/shared/auth.js
routes/reviews.js              →    routes/user/reviews.js
```

### Step 3: Update Imports in Files

Before:
```javascript
import ProductCard from '../components/ProductCard';
import { cartStore } from '../store/cartStore';
import api from '../utils/api';
```

After:
```javascript
import ProductCard from '../../user/components/ProductCard';
import { cartStore } from '../../common/store/cartStore';
import api from '../../common/utils/api';
```

---

## Benefits of This Structure

1. **Clear Role Separation**: Easy to identify user vs admin features
2. **Better Maintainability**: Related files grouped together
3. **Enhanced Security**: Admin middleware prevents unauthorized access
4. **Scalability**: Easy to add new features or endpoints
5. **Team Collaboration**: Different team members can work on different sections
6. **Permission Management**: Clear authorization checks
7. **Code Reusability**: Common components shared across roles
8. **Easier Testing**: Can test user and admin flows separately

---

## Next Steps

1. Move existing files to new structure (use file explorer or CLI)
2. Update all import paths in components and pages
3. Update server.js routes to use new middleware
4. Create new admin components (ProductForm, OrderStatusPanel, etc.)
5. Implement admin-only middleware on backend
6. Test both user and admin workflows
