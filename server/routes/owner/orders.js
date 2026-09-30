const express = require('express');
const router = express.Router();
const adminMiddleware = require('../../middleware/adminMiddleware');

/**
 * ADMIN ORDERS ROUTES
 * Admin only - View and manage all customer orders
 * All routes protected with adminMiddleware
 */

// GET /api/admin/orders
// Get all orders (with pagination, filtering, sorting)
router.get('/', adminMiddleware, (req, res) => {
  // const { getAllOrders } = require('../../controllers/owner/orderController');
  // return getAllOrders(req, res);
  res.json({ message: 'Get all orders' });
});

// GET /api/admin/orders/:id
// Get specific order details
router.get('/:id', adminMiddleware, (req, res) => {
  res.json({ message: 'Get order details' });
});

// PUT /api/admin/orders/:id/status
// Update order status (Pending → Confirmed → Shipped → Delivered)
router.put('/:id/status', adminMiddleware, (req, res) => {
  // const { updateOrderStatus } = require('../../controllers/owner/orderController');
  // return updateOrderStatus(req, res);
  res.json({ message: 'Order status updated', success: true });
});

// PUT /api/admin/orders/:id/cancel
// Cancel an order (before shipment)
router.put('/:id/cancel', adminMiddleware, (req, res) => {
  res.json({ message: 'Order cancelled', success: true });
});

module.exports = router;
