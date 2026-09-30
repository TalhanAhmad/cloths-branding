const express = require('express');
const router = express.Router();

/**
 * USER PRODUCTS ROUTES
 * Get-only endpoints for customers
 * Public access - no authentication needed
 */

// GET /api/products
// Get all products with filtering, sorting, pagination
router.get('/', (req, res) => {
  // const { getProducts } = require('../../controllers/user/productController');
  // return getProducts(req, res);
  res.json({ message: 'Get all products' });
});

// GET /api/products/search
// Search products by name, category, description
router.get('/search', (req, res) => {
  res.json({ message: 'Search products' });
});

// GET /api/products/:id
// Get single product details
router.get('/:id', (req, res) => {
  // const { getProductById } = require('../../controllers/user/productController');
  // return getProductById(req, res);
  res.json({ message: 'Get product by ID' });
});

// GET /api/products/category/:category
// Get products by category
router.get('/category/:category', (req, res) => {
  res.json({ message: 'Get products by category' });
});

module.exports = router;
