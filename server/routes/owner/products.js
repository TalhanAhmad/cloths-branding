const express = require('express');
const router = express.Router();
const adminMiddleware = require('../../middleware/adminMiddleware');

/**
 * ADMIN PRODUCTS ROUTES
 * Admin only - Create, Update, Delete products
 * All routes protected with adminMiddleware
 */

// POST /api/admin/products
// Create new product (admin only)
router.post('/', adminMiddleware, (req, res) => {
  // const { createProduct } = require('../../controllers/owner/productController');
  // return createProduct(req, res);
  res.json({ message: 'Product created', success: true });
});

// PUT /api/admin/products/:id
// Update product details (admin only)
router.put('/:id', adminMiddleware, (req, res) => {
  // const { updateProduct } = require('../../controllers/owner/productController');
  // return updateProduct(req, res);
  res.json({ message: 'Product updated', success: true });
});

// DELETE /api/admin/products/:id
// Delete product (admin only)
router.delete('/:id', adminMiddleware, (req, res) => {
  // const { deleteProduct } = require('../../controllers/owner/productController');
  // return deleteProduct(req, res);
  res.json({ message: 'Product deleted', success: true });
});

// PUT /api/admin/products/:id/stock
// Update product stock (admin only)
router.put('/:id/stock', adminMiddleware, (req, res) => {
  res.json({ message: 'Stock updated', success: true });
});

module.exports = router;
