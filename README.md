# LORA - Luxury Clothing Brand Website

## 🎯 Project Overview

LORA is a premium MERN stack e-commerce website designed for a luxury clothing brand targeting female customers in Pakistan. The platform features a clean, minimal design with smooth animations and premium aesthetics.

## 🚀 Key Features

### Client-Side
- ✨ **Homepage with Hero Section** - Full-screen banner with latest collection
- 🛍️ **Product Catalog** - Browse by categories (Formal Wear, Casual Wear, Luxury Collection)
- 🔍 **Smart Filtering** - Filter by price, size, color, and category
- 👁️ **Quick View Modal** - See product details without leaving the page
- 💬 **WhatsApp Integration** - Direct order through WhatsApp
- 🛒 **Shopping Cart** - Manage items with quantity controls
- 👤 **User Authentication** - Login/Register system
- ⭐ **Review System** - Customers can leave reviews and ratings
- 📱 **Mobile-First Design** - Fully responsive layout
- 🎨 **Premium UI** - Black/White/Gold color scheme with smooth animations

### Backend API
- 🔐 **JWT Authentication** - Secure user sessions
- 📦 **Product Management** - CRUD operations for products
- 🛒 **Order Management** - Track orders and status updates
- ⭐ **Review Management** - Product reviews and ratings
- 👥 **User Management** - Registration, login, profile

### Admin Panel
- ➕ **Add/Edit/Delete Products** - Manage inventory
- 📸 **Image Uploads** - Add product images
- 💰 **Price Management** - Set and update prices
- 📊 **Order Management** - View and update order statuses
- 🎫 **Discount Tracking** - Manage sales and offers

## 📋 Tech Stack

**Frontend:**
- React 18.2
- React Router v6
- Tailwind CSS
- Axios (API calls)
- Zustand (State management)
- React Icons
- Swiper (Carousel)

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Bcryptjs for password hashing
- CORS for cross-origin requests

## 🛠️ Installation & Setup

### Backend Setup

```bash
cd server
npm install
```

Create `.env` file:
```
MONGODB_URI=mongodb://localhost:27017/clothing-brand
PORT=5000
JWT_SECRET=your_secret_key_here
```

Start the server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

```bash
cd client
npm install
npm start
```

Frontend runs on `http://localhost:3000`

## 📁 Project Structure

```
clothing-brand/
├── server/
│   ├── models/
│   │   ├── Product.js
│   │   ├── User.js
│   │   ├── Order.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── products.js
│   │   ├── users.js
│   │   ├── orders.js
│   │   └── reviews.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── AdminPanel.jsx
│   │   ├── store/
│   │   │   └── cartStore.js
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.js
│   │   ├── index.css
│   │   └── App.css
│   ├── public/
│   │   └── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
```

## 🎨 Color Scheme

- **Primary**: Black (#000000)
- **Secondary**: White (#FFFFFF)
- **Accent**: Gold (#D4AF37)
- **Light Background**: Beige (#F5F1E8)
- **Soft Touch**: Light Pink (#FFB6C1)

## 🔗 API Endpoints

### Products
- `GET /api/products` - Get all products with filters
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Users
- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `GET /api/users/:id` - Get user profile

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/user/:userId` - Get user's orders
- `GET /api/orders` - Get all orders (admin)
- `PUT /api/orders/:id` - Update order status

### Reviews
- `POST /api/reviews` - Create review
- `GET /api/reviews/product/:productId` - Get product reviews

## 💡 Important Features

### WhatsApp Integration
- Click "Order on WhatsApp" button
- Sends product details to business WhatsApp
- Customer can finalize order via chat
- Perfect for Pakistan market

### Smart Product Filtering
- Filter by category
- Price range filtering
- Real-time search
- Saves customer time

### Admin Dashboard
- No coding required
- Upload new products with images
- Manage inventory
- Track orders
- Update prices in real-time

## 🚀 Deployment

### Backend (Heroku/Railway)
```bash
git push heroku main
```

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy the build folder
```

Update API URL in `client/src/utils/api.js` to production server URL.

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcryptjs
- CORS protection
- Input validation
- Secure MongoDB connection

## 📱 Mobile Optimization

- Fully responsive design
- Mobile-first approach
- Touch-friendly buttons
- Optimized images
- Fast loading times

## 🎯 Business Integration

- **WhatsApp Button**: Direct sales channel
- **Exchange Policy**: Display prominently on products
- **Trust Badges**: Fast delivery, quality assurance
- **Customer Reviews**: Build social proof
- **New Arrivals Section**: Auto-updates homepage
- **Discount Banner**: Create urgency with sales

## 📞 Contact & Support

For WhatsApp orders: [Update with actual number]
Email: support@lora.pk
Location: Mall of KPK, Peshawar

# cloths-branding

## 📝 License

This project is proprietary and confidential.

---

**Built with ❤️ for LORA - Where Luxury Meets Simplicity**
