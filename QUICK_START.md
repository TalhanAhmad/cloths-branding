# 🚀 QUICK START GUIDE - LORA Website

## 📦 Requirements

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn
- A modern web browser

## ⚡ Quick Start (5 Minutes)

### 1. **Clone/Extract Project**
```bash
cd clothing\ brand\ project
```

### 2. **Backend Setup**
```bash
cd server
npm install
```

Copy `.env.example` to `.env` and update values:
```bash
MONGODB_URI=mongodb://localhost:27017/clothing-brand
PORT=5000
JWT_SECRET=your-secret-key
```

Start MongoDB (if local):
```bash
mongod
```

Run server:
```bash
npm run dev
```

✅ Server running on: `http://localhost:5000`

### 3. **Frontend Setup (New Terminal)**
```bash
cd client
npm install
npm start
```

✅ Frontend running on: `http://localhost:3000`

## 📱 Testing the Website

### Homepage
- Large hero banner ✅
- 3 category sections ✅
- New arrivals ✅
- Trust badges ✅
- Customer reviews ✅

### Product Catalog
- Filter by category 📂
- Search products 🔍
- Quick view modal 👁️
- Add to cart 🛒

### WhatsApp Ordering
1. Click "Order on WhatsApp" button
2. Auto-opens WhatsApp with product details
3. Customer completes order via chat

### Admin Dashboard
1. Navigate to: `http://localhost:3000/admin`
2. Add new products
3. Update prices
4. Change order statuses

## 🎨 Customization

### Change Logo
- Edit [Header.jsx](client/src/components/Header.jsx) line 13
- Replace "LORA" with your brand name

### Update Colors
- Edit [tailwind.config.js](client/tailwind.config.js)
- Line 8-11: Change gold, darkBg, lightBg, blush colors

### Update Contact Info
- Edit [Footer.jsx](client/src/components/Footer.jsx) line 33-39
- Update WhatsApp number
- Update address
- Add social media links

### Update WhatsApp Number
- Replace `923001234567` throughout project with your actual WhatsApp number

## 🗄️ Database Seeding (Sample Data)

You can manually add sample products via Admin Panel or use MongoDB CLI:

```bash
# In MongoDB shell
use clothing-brand

db.products.insertMany([
  {
    name: "Premium Formal Dress",
    description: "Elegant formal wear for special occasions",
    price: 4999,
    originalPrice: 5999,
    category: "Formal Wear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Maroon"],
    images: ["https://via.placeholder.com/400x500"],
    inStock: true,
    isNew: true,
    rating: 4.5,
    reviewCount: 12
  }
])
```

## 🔐 Admin Login

Create admin account:
1. Register normally from Login page
2. Update user in MongoDB to `isAdmin: true`

Or:
```javascript
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { isAdmin: true } }
)
```

## 🚀 Deploy to Production

### Backend (Heroku)
```bash
cd server
heroku create
git push heroku main
```

### Frontend (Vercel)
```bash
cd client
npm run build
# Connect to Vercel via GitHub
```

## 📋 Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] MongoDB connected
- [ ] Can browse products
- [ ] Can add to cart
- [ ] Can order via WhatsApp
- [ ] Admin panel accessible
- [ ] Can add new products

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000
# Kill it
kill -9 <PID>
```

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Or use MongoDB Atlas: Update `MONGODB_URI` in `.env`

### CORS Error
- Ensure backend is running first
- Check frontend API URL in [utils/api.js](client/src/utils/api.js)

### Products Not Loading
- Check MongoDB is running
- Try adding sample product via Admin Panel
- Check browser console for errors

## 📞 Support Resources

- **Frontend Issues**: Check `client/README.md`
- **Backend Issues**: Check `server/README.md`
- **Main Docs**: Check `README.md`

---

**🎉 You're all set! Start selling luxury fashion!**

Next steps:
1. Customize brand details
2. Add your products
3. Setup Cloudinary for image uploads
4. Deploy to production
5. Promote on social media
