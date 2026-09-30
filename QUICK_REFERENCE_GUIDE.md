# Quick Reference: New Folder Structure

## 🎯 Quick Navigation Guide

### For Frontend Developers

**Working on Customer Features?**
```
Edit files in: src/user/
├── pages/        (pages.jsx files)
└── components/   (reusable components)

Common files used:
├── src/common/components/Header.jsx
├── src/common/store/cartStore.js
└── src/common/utils/api.js
```

**Working on Admin Features?**
```
Edit files in: src/owner/
├── pages/        (admin pages)
└── components/   (admin-specific components)

New admin components:
├── ProductForm.jsx
├── OrderStatusPanel.jsx
├── AnalyticsChart.jsx
└── AdminNavBar.jsx
```

### For Backend Developers

**Creating User API?**
```
Create files in: server/routes/user/
Add logic in: server/controllers/user/

Example: GET /api/products
├── routes/user/products.js
└── controllers/user/productController.js
```

**Creating Admin API?**
```
Create files in: server/routes/owner/
Add logic in: server/controllers/owner/

Example: POST /api/admin/products
├── routes/owner/products.js
├── controllers/owner/productController.js
└── middleware/adminMiddleware.js (auto-protected)
```

---

## 🗂️ Desktop View

```
FRONTEND                          BACKEND
src/                              server/

┌─ user/                          ┌─ routes/
│  ├─ pages/                      │  ├─ user/
│  │  ├─ HomePage.jsx            │  │  ├─ products.js
│  │  ├─ ProductsPage.jsx        │  │  └─ reviews.js
│  │  ├─ CartPage.jsx            │  │
│  │  ├─ AboutPage.jsx           │  ├─ owner/
│  │  └─ ContactPage.jsx         │  │  ├─ products.js
│  │                              │  │  ├─ orders.js
│  └─ components/                │  │  ├─ users.js
│     └─ ProductCard.jsx         │  │  └─ analytics.js
│                                 │  │
┌─ owner/                         │  └─ shared/
│  ├─ pages/                      │     └─ auth.js
│  │  ├─ AdminPanel.jsx          │
│  │  ├─ ProductMgmt.jsx    [NEW]│  ┌─ controllers/
│  │  ├─ OrderMgmt.jsx      [NEW]│  ├─ user/
│  │  ├─ Analytics.jsx      [NEW]│  │  ├─ productController.js
│  │  └─ UserMgmt.jsx       [NEW]│  │  └─ reviewController.js
│  │                              │  │
│  └─ components/    [NEW]        │  ├─ owner/
│     ├─ ProductForm.jsx         │  │  ├─ productController.js
│     ├─ OrderStatusPanel.jsx    │  │  ├─ orderController.js
│     ├─ AnalyticsChart.jsx      │  │  ├─ userController.js
│     └─ AdminNavBar.jsx         │  │  └─ analyticsController.js
│                                 │  │
┌─ common/                        │  └─ shared/
│  ├─ components/                 │     └─ authController.js
│  │  ├─ Header.jsx              │
│  │  └─ Footer.jsx              │  ┌─ middleware/    [NEW]
│  │                              │  ├─ authMW.js
│  ├─ utils/                      │  ├─ adminMW.js
│  │  └─ api.js                  │  └─ errorHandler.js
│  │                              │
│  └─ store/                      │  ┌─ config/       [NEW]
│     └─ cartStore.js            │  ├─ db.js
│                                 │  └─ constants.js
┌─ pages/
│  └─ LoginPage.jsx
│
├─ App.jsx
├─ index.js
└─ index.css
```

---

## 🔐 Permission Matrix

```
               PUBLIC   USER AUTH   ADMIN ONLY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Browse Products   ✅       ✅         ✅
View Reviews      ✅       ✅         ✅
Create Review            ✅         ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Create Product                       ✅
Edit Product                         ✅
Delete Product                       ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
View Orders              ✅         ✅
Manage Orders                        ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
View Analytics                       ✅
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🚀 API Endpoints Cheat Sheet

### User APIs (No Auth)
```
GET    /api/products
GET    /api/products/:id
GET    /api/products/search?q=...
GET    /api/reviews/:productId
```

### User APIs (With Auth)
```
POST   /api/reviews
POST   /api/auth/login
POST   /api/auth/register
```

### Admin APIs (Admin Only)
```
POST   /api/admin/products
PUT    /api/admin/products/:id
DELETE /api/admin/products/:id

GET    /api/admin/orders
PUT    /api/admin/orders/:id/status

GET    /api/admin/analytics/dashboard
GET    /api/admin/analytics/sales
```

---

## 📝 Common Tasks & Where to Edit

| Task | Location | File |
|------|----------|------|
| Add new user page | `src/user/pages/` | `NewPage.jsx` |
| Add user component | `src/user/components/` | `Component.jsx` |
| Add admin page | `src/owner/pages/` | `AdminPage.jsx` |
| Add admin component | `src/owner/components/` | `Component.jsx` |
| Edit header/footer | `src/common/components/` | `Header/Footer.jsx` |
| Update API calls | `src/common/utils/` | `api.js` |
| Change app state | `src/common/store/` | `cartStore.js` |
| Update routing | `src/` | `App.jsx` |
| Add user API | `server/routes/user/` + `server/controllers/user/` | `*.js` |
| Add admin API | `server/routes/owner/` + `server/controllers/owner/` | `*.js` |
| Update auth | `server/routes/shared/` + `server/controllers/shared/` | `auth.js` |
| Database schema | `server/models/` | `Model.js` |

---

## 🔑 Key Middleware

### authMiddleware
```javascript
// Used for: User-authenticated routes
// Checks: Valid JWT token in header
// Applied to: POST /api/reviews

router.post('/reviews', authMiddleware, handler);
```

### adminMiddleware
```javascript
// Used for: Admin-only routes
// Checks: Valid JWT token + isAdmin flag
// Applied to: All /api/admin/* routes

router.post('/admin/products', adminMiddleware, handler);
```

---

## 🎓 Learning Path

### Understanding the Structure (5 mins)
1. Read: `PROJECT_STRUCTURE_OVERVIEW.md` (this file)
2. Look at: Before/After folder comparison

### Implementation (30 mins)
1. Read: `FOLDER_STRUCTURE_GUIDE.md`
2. Follow: `STRUCTURE_IMPLEMENTATION_GUIDE.md`
3. Move: Existing files to new folders
4. Update: Import paths

### Verification (15 mins)
1. Run frontend: `npm start`
2. Run backend: `npm start`
3. Test user features
4. Test admin features
5. Check browser console for errors

---

## 💡 Pro Tips

**Tip 1: Import Pattern**
```javascript
// Always go up to common from user/owner
import api from '../../common/utils/api';

// Go up one level from pages to components
import ProductForm from '../components/ProductForm';
```

**Tip 2: Admin Protection**
```javascript
// Admin routes automatically protected
router.post('/admin/products', adminMiddleware, handler);
// ✓ No token = 401 Unauthorized
// ✓ Not admin = 403 Forbidden
// ✓ Is admin = Proceeds
```

**Tip 3: Adding New Features**
```javascript
// New user feature? Create in src/user/
// New admin feature? Create in src/owner/
// Shared by both? Create in src/common/
```

---

## ⚡ Quick Commands

```bash
# Frontend setup
cd client
npm install
npm start

# Backend setup
cd server
npm install
npm start

# Test endpoints
curl http://localhost:5000/api/products
curl -X POST http://localhost:5000/api/auth/login -d {...}
```

---

## 📞 Need Help?

**Question**                              | **Answer Location**
---                                       | ---
What files go where?                      | FOLDER_STRUCTURE_GUIDE.md
How do I implement this?                  | STRUCTURE_IMPLEMENTATION_GUIDE.md
What's the complete directory tree?       | PROJECT_STRUCTURE_OVERVIEW.md
How do I deploy?                          | DEPLOYMENT_GUIDE.md
What API endpoints exist?                 | STRUCTURE_IMPLEMENTATION_GUIDE.md
Which middleware to use?                  | This file (Key Middleware section)
Where do I add feature X?                 | This file (Common Tasks table)
