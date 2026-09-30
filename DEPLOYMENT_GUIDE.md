# 🌍 DEPLOYMENT GUIDE

Complete guide to deploy LORA website to production.

## 📊 Current Project Structure

```
✅ Backend: Express.js + MongoDB
✅ Frontend: React + Tailwind CSS
✅ Database: MongoDB (local or Atlas)
✅ Authentication: JWT
✅ WhatsApp Integration: Ready
✅ Admin Panel: Complete
```

## 🔧 Pre-Deployment Checklist

- [ ] All environment variables configured
- [ ] Database connection tested
- [ ] Frontend builds successfully
- [ ] Admin panel tested
- [ ] WhatsApp integration verified
- [ ] Product images optimized
- [ ] Error handling in place

## ☁️ Backend Deployment

### Option 1: Heroku (Recommended for Beginners)

**Prerequisites:**
- Heroku account (free)
- Heroku CLI installed

**Steps:**

```bash
# 1. Login to Heroku
heroku login

# 2. Create Heroku app
cd server
heroku create your-app-name

# 3. Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
heroku config:set CLOUDINARY_API_KEY=your_key

# 4. Deploy
git push heroku main
```

**Verify:**
```bash
heroku logs --tail
```

### Option 2: Railway.app

**Steps:**
1. Connect GitHub repo to Railway
2. Add environment variables
3. Deploy!

**Environment Variables:**
```
MONGODB_URI=
JWT_SECRET=
PORT=
```

### Option 3: AWS / DigitalOcean

**For AWS EC2:**
```bash
# SSH into server
ssh -i key.pem ec2-user@your-ip

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Clone repo
git clone your-repo
cd server
npm install

# Install PM2 (keeps app running)
npm install -g pm2
pm2 start server.js --name "lora-backend"

# Install Nginx (reverse proxy)
sudo yum install nginx -y
# Configure nginx to forward to port 5000
```

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

**Steps:**
1. Push frontend to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repo
5. Configure:
   - Framework: Create React App
   - Environment Variable: `REACT_APP_API_URL`
6. Deploy!

**Update API URL:**
In `client/src/utils/api.js`:
```javascript
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://your-backend.herokuapp.com/api'
});
```

### Option 2: Netlify

**Steps:**
1. Build frontend:
```bash
npm run build
```

2. Go to [netlify.com](https://netlify.com)
3. Drag & drop `build` folder
4. Configure domain & environment variables

### Option 3: GitHub Pages

```bash
# Add to package.json
"homepage": "https://yourusername.github.io/clothing-brand"

# Deploy
npm run build
npm install --save-dev gh-pages

# Add scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

npm run deploy
```

## 🗄️ Database Deployment

### MongoDB Atlas (Recommended)

**Setup:**
1. Create account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP addresses
5. Get connection string
6. Update `MONGODB_URI` in backend

**Connection String Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/clothing-brand?retryWrites=true&w=majority
```

## 📧 Email Service Setup (Optional)

### SendGrid for Order Notifications

```bash
npm install @sendgrid/mail
```

**Update server.js:**
```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Send order confirmation email
const msg = {
  to: customer_email,
  from: 'orders@lora.pk',
  subject: 'Order Confirmation',
  html: '<h1>Thank you for your order!</h1>'
};
sgMail.send(msg);
```

## 🖼️ Image Hosting

### Cloudinary Setup

```bash
npm install cloudinary next-cloudinary
```

**Add to .env:**
```
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

## 🔒 SSL Certificate

### Let's Encrypt (Free)

```bash
# For Nginx
sudo apt install certbot python3-certbot-nginx -y
sudo certbot certonly --nginx -d yourdomain.com
```

## 🚀 Performance Optimization

### Frontend
```bash
# Analyze bundle
npm install --save-dev webpack-bundle-analyzer

# Lazy load routes
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
```

### Backend
```javascript
// Add caching headers
app.use(express.static('public', {
  maxAge: '1d',
  etag: false
}));

// Enable compression
const compression = require('compression');
app.use(compression());
```

## 📊 Monitoring & Logs

### Sentry for Error Tracking

```bash
npm install @sentry/node
```

```javascript
const Sentry = require("@sentry/node");
Sentry.init({ dsn: process.env.SENTRY_DSN });
```

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Deploy to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{secrets.HEROKU_API_KEY}}
```

## 📱 Mobile App (Future)

Consider React Native / Expo for mobile apps.

## 🎯 Post-Launch Checklist

- [ ] Domain purchased & configured
- [ ] SSL certificate installed
- [ ] Database backups configured
- [ ] Monitoring alerts setup
- [ ] Error logging active
- [ ] Performance monitoring enabled
- [ ] Social media linked
- [ ] Analytics configured

## 📈 Production Environment Variables

```
# Backend
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/db
PORT=5000
JWT_SECRET=production_secret_key_here
NODE_ENV=production
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
SENDGRID_API_KEY=your_key

# Frontend
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_ENV=production
```

## 🆘 Common Issues

**CORS Error**
- Ensure backend CORS is configured
- Update API URL in frontend

**Database Connection**
- Check IP whitelist in MongoDB Atlas
- Verify connection string

**Assets Not Loading**
- Check CORS headers
- Verify CDN configuration

**Performance Issues**
- Enable caching
- Compress images
- Use CDN for assets

---

**Your LORA website is ready for the world! 🌍**
