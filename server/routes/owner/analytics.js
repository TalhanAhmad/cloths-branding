const express = require('express');
const router = express.Router();
const adminMiddleware = require('../../middleware/adminMiddleware');

/**
 * ANALYTICS ROUTES
 * Admin only - View sales data, revenue, charts
 * All routes protected with adminMiddleware
 */

// GET /api/admin/analytics/dashboard
// Get dashboard overview (total sales, orders, customers)
router.get('/dashboard', adminMiddleware, (req, res) => {
  // const { getDashboardStats } = require('../../controllers/owner/analyticsController');
  // return getDashboardStats(req, res);
  res.json({
    message: 'Dashboard stats',
    data: {
      totalSales: 0,
      totalOrders: 0,
      totalCustomers: 0,
      totalRevenue: 0,
    },
  });
});

// GET /api/admin/analytics/sales
// Get sales data for time period (daily, weekly, monthly)
router.get('/sales', adminMiddleware, (req, res) => {
  res.json({ message: 'Sales analytics' });
});

// GET /api/admin/analytics/top-products
// Get top selling products
router.get('/top-products', adminMiddleware, (req, res) => {
  res.json({ message: 'Top products' });
});

// GET /api/admin/analytics/revenue
// Get revenue breakdown by category
router.get('/revenue', adminMiddleware, (req, res) => {
  res.json({ message: 'Revenue breakdown' });
});

module.exports = router;
