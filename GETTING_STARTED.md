# 🎯 GETTING STARTED - LORA Website

Complete beginner-friendly guide to get your website running in 15 minutes.

## ⚙️ Prerequisites (Install First)

### 1. **Node.js** (Required)
- Download: https://nodejs.org/ (Choose LTS version)
- Install and verify:
```bash
node --version
npm --version
```

### 2. **MongoDB** (Database)

**Option A: Local Installation**
- Download: https://www.mongodb.com/try/download/community
- Install and start MongoDB

**Option B: MongoDB Atlas (Cloud) - Recommended**
- Go to: https://www.mongodb.com/cloud/atlas
- Create free account
- Create cluster
- Copy connection string
- Use in `.env` file

### 3. **Git** (Optional but recommended)
- Download: https://git-scm.com/

### 4. **Code Editor**
- VS Code: https://code.visualstudio.com/

## 📋 Quick Setup Checklist

- [ ] Node.js installed
- [ ] MongoDB ready (local or Atlas)
- [ ] Project folder ready
- [ ] Terminal/Command Prompt open

## 🚀 Start the Website (Step by Step)

### Step 1: Open Terminal in Project Folder

**Windows:**
1. Open Command Prompt
2. Navigate to folder: `cd "C:\Users\Your PC VISION\OneDrive\Desktop\clothing brand project"`

**Mac/Linux:**
1. Open Terminal
2. Navigate to folder: `cd ~/Desktop/"clothing brand project"`

### Step 2: Start Backend

```bash
# Navigate to server folder
cd server

# Install dependencies (first time only)
npm install

# Create .env file with:
# MONGODB_URI=mongodb://localhost:27017/clothing-brand
# PORT=5000
# JWT_SECRET=my-secret-key-123

# Start server
npm run dev
```

✅ You should see: `Server running on port 5000`

Keep this terminal open!

### Step 3: Start Frontend (Open NEW Terminal)

```bash
# Navigate back to main folder
cd ..

# Navigate to client folder
cd client

# Install dependencies (first time only)
npm install

# Start frontend
npm start
```

✅ Browser will automatically open: `http://localhost:3000`

**Now you have a running website!** 🎉

## 🌐 Accessing Different Parts

| Part | URL | Purpose |
|------|-----|---------|
| **Website** | http://localhost:3000 | Main shopping website |
| **Admin Panel** | http://localhost:3000/admin | Manage products |
| **Backend API** | http://localhost:5000 | REST API |

## 📝 What You Should See

### Homepage
- ✅ Large banner with "New Luxury Collection 2026"
- ✅ 3 category sections
- ✅ New arrivals section
- ✅ Trust badges
- ✅ Footer with links

### Products Page
- ✅ Product catalog on left
- ✅ Filters on right (category, price)
- ✅ Product cards with images

### Cart
- ✅ Add items to cart
- ✅ See cart contents
- ✅ WhatsApp checkout button

### Admin Panel
- ✅ Add product button
- ✅ Product management table
- ✅ Order tracking

## 🎨 First Customization Steps

### 1. Change Brand Name

**Step 1:** Open [client/src/components/Header.jsx](../client/src/components/Header.jsx)

Find line 13:
```jsx
<Link to="/" className="text-3xl font-bold text-black">
  LORA<span className="text-gold">.</span>
</Link>
```

Change `LORA` to your brand name:
```jsx
<Link to="/" className="text-3xl font-bold text-black">
  YOUR BRAND<span className="text-gold">.</span>
</Link>
```

Save file. Website will refresh automatically.

### 2. Change WhatsApp Number

**Step 1:** Open [client/src/components/Footer.jsx](../client/src/components/Footer.jsx)

Find line ~39: `https://wa.me/923001234567`

Change `923001234567` to your WhatsApp number:
```jsx
href="https://wa.me/YOUR_WHATSAPP_NUMBER"
```

**Step 2:** Also search in other files:
- [ProductCard.jsx](../client/src/components/ProductCard.jsx)
- [CartPage.jsx](../client/src/pages/CartPage.jsx)
- [HomePage.jsx](../client/src/pages/HomePage.jsx)

Replace all instances with your number.

### 3. Change Colors

**Step 1:** Open [client/tailwind.config.js](../client/tailwind.config.js)

Find lines 8-11:
```javascript
colors: {
  gold: '#D4AF37',
  darkBg: '#0F0F0F',
  lightBg: '#F5F1E8',
  blush: '#FFB6C1'
}
```

Change colors (hex codes):
- Gold (accent): #D4AF37 → Your color
- Dark background: #0F0F0F → Your color
- Light background: #F5F1E8 → Your color

### 4. Change Contact Address

**Step 1:** Open [client/src/components/Footer.jsx](../client/src/components/Footer.jsx)

Find the address line (~38):
```jsx
<span className="text-gray-400">Mall of KPK, Peshawar</span>
```

Change to your address.

## 🛍️ Adding Your First Product

### Via Admin Panel (Easy Way)

1. Go to: http://localhost:3000/admin
2. Click "Add Product" button
3. Fill in details:
   - Name: "Beautiful Dress"
   - Price: 5000
   - Category: "Formal Wear"
   - Sizes: S,M,L,XL
   - Colors: Black,White,Red
   - Images: Paste image URLs
4. Click "Create"

Done! Product appears on homepage.

### Where to Get Product Images

Free image websites:
- https://unsplash.com
- https://pexels.com
- https://pixabay.com

Just copy image URL and paste in admin panel.

## 🔐 Creating Admin Account

### Step 1: Register

1. Go to http://localhost:3000/login
2. Click "Register" button
3. Fill in details:
   - Name: Your name
   - Email: yourname@example.com
   - Phone: Your phone
   - Password: Create password
4. Click "Register"

### Step 2: Make Admin

1. Open MongoDB (compass or Atlas)
2. Go to `users` collection
3. Find your user
4. Edit and add: `isAdmin: true`
5. Save

Now your account is admin! ✅

## 🧪 Testing Features

### Test 1: Adding Product

1. Admin panel → Add Product
2. Fill all fields
3. Click Create
4. Go to home page
5. See new product? ✅

### Test 2: Shopping

1. Homepage → Click product
2. Click "Add to Cart"
3. Click cart icon (top right)
4. See product in cart? ✅

### Test 3: WhatsApp Order

1. Add product to cart
2. Go to cart
3. Click "Order on WhatsApp"
4. WhatsApp opens? ✅

### Test 4: Filtering

1. Go to Products page
2. Select category "Formal Wear"
3. Products change? ✅
4. Try price filter
5. Works? ✅

## ❌ Common Issues & Fixes

### "Cannot find module" Error

**Fix:**
```bash
npm install
```

### Port 5000 Already in Use

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Error

**Fix 1:** Check MongoDB is running
```bash
# Windows: Open MongoDB Compass
# Mac/Linux: Run `mongod` in terminal
```

**Fix 2:** Use MongoDB Atlas instead
- Create account: https://mongodb.com/cloud/atlas
- Get connection string
- Update MONGODB_URI in `.env`

### Website Won't Load

1. Check terminal for errors
2. Terminal should show no red errors
3. If port shows in use:
   - Kill process (see above)
   - Run `npm run dev` again

### Backend Not Responding

1. Check if `npm run dev` is running in terminal
2. Check port 5000 is not blocked
3. Try accessing: http://localhost:5000/api/health
4. Should see: `{"message": "Server is running"}`

## 📱 Mobile Testing

1. Open: http://localhost:3000 on your computer
2. Press `F12` → Toggle Device Toolbar
3. Choose mobile device
4. Test website on different screen sizes
5. Should look good on all sizes ✅

## 🎓 Understanding the Code Structure

```
Homepage
  ↓ Shows components
  ↓
Header (Navigation)
  ├─ Logo
  ├─ Menu
  └─ Cart Icon
  
Main Content
  ├─ Hero Section
  ├─ Products Grid
  └─ Trust Section

Footer (Contact)
  ├─ Links
  └─ WhatsApp Button
```

## 📚 Learn More

- **Beginner's Guide**: See [QUICK_START.md](./QUICK_START.md)
- **Deploy Online**: See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Full Details**: See [README.md](./README.md)
- **Architecture**: See [ARCHITECTURE.md](./ARCHITECTURE.md)

## ✅ Your First Day Checklist

- [ ] Website running on localhost:3000
- [ ] Backend running on localhost:5000
- [ ] Create admin account
- [ ] Add 1-2 test products
- [ ] Test shopping flow
- [ ] Test WhatsApp button
- [ ] Customize brand name
- [ ] Update WhatsApp number
- [ ] Change accent color

## 🎉 Next Steps

1. **Add Products**: Use admin panel to add all your products
2. **Add Images**: Find good product photos
3. **Customize**: Match your brand colors and style
4. **Test Everything**: Make sure all features work
5. **Deploy**: Follow [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 💬 Need Help?

1. Check this file first
2. Check [QUICK_START.md](./QUICK_START.md)
3. Check terminal for error messages
4. Check browser console (F12)
5. Check [README.md](./README.md)

---

**You're ready to launch your luxury brand website!** 🚀

**Questions?** Refer to the documentation files in the project folder.
