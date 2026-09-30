# Implementation Guide: New Folder Structure

## Quick Start: 3 Steps to Implement

### Step 1: Copy Existing Frontend Files to New Folders

```bash
# Move user-facing pages
copy client\src\pages\HomePage.jsx client\src\user\pages\
copy client\src\pages\ProductsPage.jsx client\src\user\pages\
copy client\src\pages\CartPage.jsx client\src\user\pages\
copy client\src\pages\AboutPage.jsx client\src\user\pages\
copy client\src\pages\ContactPage.jsx client\src\user\pages\

# Move user components
copy client\src\components\ProductCard.jsx client\src\user\components\

# Move shared components
copy client\src\components\Header.jsx client\src\common\components\
copy client\src\components\Footer.jsx client\src\common\components\

# Move shared utilities
copy client\src\utils\api.js client\src\common\utils\
copy client\src\store\cartStore.js client\src\common\store\

# Keep LoginPage at top level (it's a junction point)
# Keep App.jsx at top level (main routing)
```

### Step 2: Update All Imports in Frontend Files

**In ProductsPage.jsx:**
```javascript
// OLD
import ProductCard from '../components/ProductCard';
import { cartStore } from '../store/cartStore';
import api from '../utils/api';

// NEW
import ProductCard from '../../user/components/ProductCard';
import { cartStore } from '../../common/store/cartStore';
import api from '../../common/utils/api';
```

**In HomePage.jsx, CartPage.jsx, AboutPage.jsx, ContactPage.jsx:**
```javascript
// OLD
import Header from '../components/Header';
import Footer from '../components/Footer';

// NEW
import Header from '../common/components/Header';
import Footer from '../common/components/Footer';
```

**In AdminPanel.jsx:**
```javascript
// Move to: client/src/owner/pages/AdminPanel.jsx
// Update imports similarly to reference common components
import Header from '../../common/components/Header';
import Footer from '../../common/components/Footer';
```

### Step 3: Update App.jsx Routing Structure

**Update App.jsx to use new folder structure:**
```javascript
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// User Pages
import HomePage from './user/pages/HomePage';
import ProductsPage from './user/pages/ProductsPage';
import CartPage from './user/pages/CartPage';
import AboutPage from './user/pages/AboutPage';
import ContactPage from './user/pages/ContactPage';

// Auth Page (shared)
import LoginPage from './pages/LoginPage';

// Admin Pages
import AdminPanel from './owner/pages/AdminPanel';

// Common Components
import Header from './common/components/Header';
import Footer from './common/components/Footer';

// Store
import { cartStore } from './common/store/cartStore';

function App() {
  const user = cartStore(state => state.user); // Get user from Zustand

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            {/* ========== USER ROUTES ========== */}
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* ========== AUTH ROUTES ========== */}
            <Route path="/login" element={<LoginPage />} />

            {/* ========== ADMIN ROUTES (Protected) ========== */}
            <Route
              path="/admin/*"
              element={
                user?.isAdmin ? (
                  <AdminPanel />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* 404 Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
```

---

## Backend Implementation

### Step 1: Update server.js

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import middleware
const authMiddleware = require('./middleware/authMiddleware');
const adminMiddleware = require('./middleware/adminMiddleware');
const errorHandler = require('./middleware/errorHandler');

// Import config
const connectDB = require('./config/db');
const constants = require('./config/constants');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database
connectDB();

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ========== SHARED ROUTES (Auth) ==========
app.use('/api/auth', require('./routes/shared/auth'));

// ========== USER ROUTES (Public/Protected) ==========
app.use('/api/products', require('./routes/user/products'));
app.use('/api/reviews', require('./routes/user/reviews'));

// ========== ADMIN ROUTES (Protected with Admin Middleware) ==========
app.use('/api/admin/products', adminMiddleware, require('./routes/owner/products'));
app.use('/api/admin/orders', adminMiddleware, require('./routes/owner/orders'));
app.use('/api/admin/users', adminMiddleware, require('./routes/owner/users'));
app.use('/api/admin/analytics', adminMiddleware, require('./routes/owner/analytics'));

// Error handling middleware
app.use(errorHandler);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});
```

### Step 2: Update Backend Routes

**In each route file, use the new controllers:**

Example for `routes/user/products.js`:
```javascript
const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  searchProducts,
} = require('../../controllers/user/productController');

router.get('/', getProducts);
router.get('/search', searchProducts);
router.get('/:id', getProductById);

module.exports = router;
```

Example for `routes/owner/products.js`:
```javascript
const express = require('express');
const router = express.Router();
const adminMiddleware = require('../../middleware/adminMiddleware');
const {
  createProduct,
  updateProduct,
  deleteProduct,
  bulkUploadProducts,
} = require('../../controllers/owner/productController');

router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/bulk', bulkUploadProducts);

module.exports = router;
```

---

## API Endpoints Summary

### Authentication (Shared)
```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - Login user
POST   /api/auth/logout         - Logout user
```

### Products (User - Read Only)
```
GET    /api/products            - Get all products (paginated)
GET    /api/products/:id        - Get single product
GET    /api/products/search     - Search products
GET    /api/products/category/:category - Filter by category
```

### Reviews (User - Read/Write)
```
GET    /api/reviews/:productId  - Get product reviews
POST   /api/reviews             - Create review (auth required)
GET    /api/reviews/rating/:id  - Get product rating
```

### Admin Products (Owner - CRUD)
```
POST   /api/admin/products      - Create product
PUT    /api/admin/products/:id  - Update product
DELETE /api/admin/products/:id  - Delete product
POST   /api/admin/products/bulk - Bulk upload
```

### Admin Orders (Owner - Manage)
```
GET    /api/admin/orders        - Get all orders
GET    /api/admin/orders/:id    - Get order details
PUT    /api/admin/orders/:id/status - Update status
PUT    /api/admin/orders/:id/cancel - Cancel order
```

### Admin Users (Owner - Manage)
```
GET    /api/admin/users         - Get all users
GET    /api/admin/users/:id     - Get user details
PUT    /api/admin/users/:id/role - Change user role
DELETE /api/admin/users/:id     - Delete user
```

### Analytics (Owner - Reports)
```
GET    /api/admin/analytics/dashboard - Dashboard stats
GET    /api/admin/analytics/sales - Sales analytics
GET    /api/admin/analytics/top-products - Top products
GET    /api/admin/analytics/revenue - Revenue by category
```

---

## File Structure After Implementation

```
src/
├── App.jsx ............................ Router (stays at top level)
├── index.js ........................... Entry point (stays)
├── index.css .......................... Styles (stays)
│
├── pages/
│   └── LoginPage.jsx .................. Shared login page
│
├── user/
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── AboutPage.jsx
│   │   └── ContactPage.jsx
│   │
│   └── components/
│       └── ProductCard.jsx
│
├── owner/
│   ├── pages/
│   │   ├── AdminPanel.jsx
│   │   ├── ProductManagement.jsx .... (CREATE/UPDATE/DELETE)
│   │   ├── OrderManagement.jsx ...... (View/Update Status)
│   │   ├── Analytics.jsx ............ (Sales Reports)
│   │   └── UserManagement.jsx ....... (Manage Accounts)
│   │
│   └── components/
│       ├── AdminNavBar.jsx
│       ├── ProductForm.jsx
│       ├── OrderStatusPanel.jsx
│       └── AnalyticsChart.jsx
│
└── common/
    ├── components/
    │   ├── Header.jsx
    │   └── Footer.jsx
    │
    ├── utils/
    │   └── api.js
    │
    └── store/
        └── cartStore.js
```

---

## Import Path Reference

| From | To | Import Path |
|------|----|----|
| user/pages/* | common/components | `../../common/components/Header` |
| user/pages/* | common/store | `../../common/store/cartStore` |
| user/pages/* | common/utils | `../../common/utils/api` |
| user/components/* | common/components | `../../common/components/Header` |
| owner/pages/* | common/components | `../../common/components/Header` |
| owner/pages/* | owner/components | `../components/ProductForm` |
| owner/components/* | common/components | `../../common/components/Header` |
| App.jsx | user/pages | `./user/pages/HomePage` |
| App.jsx | owner/pages | `./owner/pages/AdminPanel` |
| App.jsx | common/components | `./common/components/Header` |

---

## Verification Checklist

After implementing the new structure:

- [ ] All frontend files moved to correct folders
- [ ] All imports updated in component files
- [ ] App.jsx routing updated to new paths
- [ ] Backend server.js imports all new route files
- [ ] All route files import from new controller locations
- [ ] adminMiddleware applied to admin routes
- [ ] Frontend compiles without errors
- [ ] Backend starts without errors
- [ ] User can browse products (public)
- [ ] Admin can access admin panel (protected)
- [ ] All pages route correctly

---

## Testing the Implementation

### Frontend Testing
```bash
cd client
npm start
# Test user routes: / /shop /cart /about /contact
# Test admin: /admin (should redirect if not admin)
# Test login: /login
```

### Backend Testing
```bash
cd server
npm start

# Test public endpoint
curl http://localhost:5000/api/products

# Test admin endpoint (should fail without token)
curl http://localhost:5000/api/admin/products

# Test admin endpoint with token
curl -H "Authorization: Bearer YOUR_TOKEN" http://localhost:5000/api/admin/products
```

---

## Benefits Achieved

✅ **Clear Role Separation**: User and owner features completely separated
✅ **Enhanced Security**: Admin middleware prevents unauthorized access
✅ **Better Maintainability**: Each concern isolated in its own folder
✅ **Improved Scalability**: Easy to add new features without cluttering
✅ **Team Collaboration**: Different developers can work simultaneously
✅ **Reduced Merge Conflicts**: Changes in isolated folders
✅ **Better Code Organization**: Logical grouping of related files
✅ **Easier Testing**: Can test user and admin flows independently
