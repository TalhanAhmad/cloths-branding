# Backend Server

MERN Stack Backend API for LORA Clothing Brand

## Setup

```bash
npm install
```

## Environment Variables

Create `.env` file:

```
MONGODB_URI=mongodb://localhost:27017/clothing-brand
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Running

**Development:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server runs on `http://localhost:5000`

## Database

MongoDB must be installed and running:

```bash
mongod
```

Or use MongoDB Atlas cloud database by updating `MONGODB_URI` in `.env`

## API Documentation

See main README.md for complete API endpoints documentation.

## Features

- ✅ RESTful API with Express
- ✅ MongoDB NoSQL Database
- ✅ JWT Authentication
- ✅ Product Management
- ✅ Order Management  
- ✅ Review System
- ✅ User Management
